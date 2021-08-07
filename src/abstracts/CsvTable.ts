import fs from 'fs';

class Parser {
    isReadyPromise;
    isReadyPromiseResolver;
    rawData;
}

class Table<Model> {
    headers: string[];
    rows:;
}

export default class ReadableTable<Model> extends Table<Model>, Readable<CsvFileFormat> {

    rowObjs;
    path;
    model;

    constructor(path, model) {
        super()
        this.path = path;
        this.model = model;
        this.isReadyPromise = new Promise(res => {this.isReadyPromiseResolver = res});
        this.readTableFile();
        return this.isReadyPromise;
    }

    readTableFile(){
        fs.readFile(this.path, 'utf8' , (err, rawData) => {
            if (err) throw err;
            this.rawData = rawData;
            this.getHeaderAndRowStrings();
        })
    }
    
    getHeaderAndRowStrings(){
        const split = this.rawData.split('\n'); 
        this.headers = split[0].split(',');
        this.rows = split.slice(1);
        this.cleanRowStrings();
    }

    cleanRowStrings(){      
        removeEmptyStringsFromArray(this.rows);
        this.rows = this.rows.map(row => makeNewStringWithoutSpacesAfterComma(row));
        this.mapRowsToModelObjects();
    }

    mapRowsToModelObjects(){
        this.rowObjs = this.rows.map(this.addIndex.bind(this));
        this.resolveReady();
    }

    addIndex(row){
        const rowObj = new this.model(...row.split(','))

        // create a static map of index to rows if there is an id column
        if (this.headers.includes('id')) {
            this.model.indexToRowMap ||= new Map()
            this.model.indexToRowMap.set(row.split(',')[0], rowObj)
        } else {
        // else create an `all` array
            this.model.all ||= []
            this.model.all.push(rowObj)
        }
        return rowObj
        
    }

    resolveReady(){
        this.isReadyPromiseResolver(this.rowObjs);
    }
}





const assert = require('assert');
// ['3,Math', 'Mrs. C', ''] destructively becomes ['3,Math', 'Mrs. C']
function removeEmptyStringsFromArray(array){
    for (let i = 0; i < array.length; i++) {
        let j = i;
        while (array[j] === "") j++;
        array.splice(i, j-i);
    }
}
const emptyTest = ['3,Math', 'Mrs. C', ''];
removeEmptyStringsFromArray(emptyTest);
assert.deepStrictEqual(emptyTest.filter(ele => ele === '').length, 0);

// '2,History, Mrs. P' becomes '2,History,Mrs. P'
function makeNewStringWithoutSpacesAfterComma(string){
    let answer = '';
    for (let i = 0; i < string.length; i++) {
        let j = i;
        while (string[i] === ',' && string[j+1] === ' ') j++;
        answer += string[i];
        i = j;
    }
    return answer;
}
assert.deepStrictEqual(makeNewStringWithoutSpacesAfterComma('2,History, Mrs. P'), '2,History,Mrs. P');
