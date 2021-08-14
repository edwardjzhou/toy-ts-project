import fs from 'fs';
// enum Foo { X, Y }
// TypeScript will emit the following object:

// var Foo;
// (function (Foo) {
//     Foo[Foo["X"] = 0] = "X";
//     Foo[Foo["Y"] = 1] = "Y";
// })(Foo || (Foo = {}));
ENUM FOR FOREIGN KE#YS
dw
namespace Suffixes {
  export const csv = 'csv'
}

const CSV = Suffixes.csv
type CSV = typeof CSV

// type CSV = typeof CSV;
type File<Filename extends string, Root extends string> = 
  Filename extends `${infer Prefix}.${Root}` ? Filename : `${Filename}.${Root}`;
type CSVFile<Filename extends string> = File<Filename, CSV>
let testFile: CSVFile<'filename.csv'> = 'filename.csv'



interface Promisfied {
    isReadyPromise: Promise<any>;
    isReadyPromiseResolver?: (v:any) => void;
}
class Parser<FileType extends string> implements Promisfied {
  protected isReadyPromise: Promise<any>;
  protected isReadyPromiseResolver?: (v:any) => void;
  path: FileType;

  constructor(path: FileType, cb?: Function) {
    this.isReadyPromise = new Promise(res => {this.isReadyPromiseResolver = res});
    this.path = path;
  }

  read(){
    fs.readFile(__dirname + this.path, 'utf8' , (err, rawData) => {
        if (err) throw err;
        console.log(rawData)
        this.resolveReady(rawData)
    })
    return this.isReadyPromise
  }

  resolveReady(data){
      this.isReadyPromiseResolver(data);
  }
}


type header = string;
interface Table {
    headers: header[];
    rows: string[];
    model;
}

// const assert = require('assert');
// // ['3,Math', 'Mrs. C', ''] destructively becomes ['3,Math', 'Mrs. C']
function removeEmptyStringsFromArray(array: string[]){
    for (let i = 0; i < array.length; i++) {
        let j = i;
        while (array[j] === "") j++;
        array.splice(i, j-i);
    }
}
// const emptyTest = ['3,Math', 'Mrs. C', ''];
// removeEmptyStringsFromArray(emptyTest);
// assert.deepStrictEqual(emptyTest.filter(ele => ele === '').length, 0);

// // '2,History, Mrs. P' becomes '2,History,Mrs. P'
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
// assert.deepStrictEqual(makeNewStringWithoutSpacesAfterComma('2,History, Mrs. P'), '2,History,Mrs. P');


import { performance } from "perf_hooks";
const measure = (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const finish = performance.now();
    console.log(`Execution time: ${finish - start} milliseconds`);
    return result;
  };

  return descriptor;
};


interface Statics<Model>{
  all: any;
  indexToRowMap: any;
  new (...args: any[]): Model;
}


// function addStatics(Base){
//   return class Derived extends Base {
//     all: any;
//     indexToRowMap: any;
//   }
}
// const makeStatics = <Model>(Base): ReturnType<typeof makeStatics> => {
//   return class ModelWithStatics extends Base implements Statics<Model> {
//     static all: Model[];
//     static indexToRowMap: any;
//   }
// }



class CsvTableParser<Model> extends Parser<CSV> implements Table {
  modelObjects: Model[];
  headers: header[];
  rows: string[];
  model: ReturnType<Model>

  constructor(path, model) {
      super(path)
      this.model = model;
  }

  @measure
  readTableFile(){
    this.read().then(this.getHeaderAndRowStrings.bind(this));
  }
  
  getHeaderAndRowStrings(data){
      const split = data.split('\n'); 
      this.headers = split[0].split(',');
      this.rows = split.slice(1);
      // console.log(split, this)
      this.cleanRowStrings();
  }

  cleanRowStrings(): void{      
      removeEmptyStringsFromArray(this.rows);
      this.rows = this.rows.map(row => makeNewStringWithoutSpacesAfterComma(row));
      this.mapRowsToModelObjects();
  }

  private mapRowsToModelObjects(): void{
      this.modelObjects = this.rows.map(this.addIndex.bind(this));
      // console.log(this)
      //       CsvTableParser {
      //   isReadyPromiseResolver: [Function (anonymous)],
      //   isReadyPromise: Promise { 'id,name\n1,A\n2,B\n3,C' },
      //   path: '/../students.csv',
      //   model: [class Student] {
      //     indexToRowMap: Map(3) { '1' => [Student], '2' => [Student], '3' => [Student] }
      //   },
      //   headers: [ 'id', 'name' ],
      //   rows: [ '1,A', '2,B', '3,C' ],
      //   modelObjects: [
      //     Student { id: 1, name: 'A', totalAverage: NaN, courses: [] },
      //     Student { id: 2, name: 'B', totalAverage: NaN, courses: [] },
      //     Student { id: 3, name: 'C', totalAverage: NaN, courses: [] }
      //   ]
      // }
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

}
// fs.readFile(__dirname+ '/../students.csv',(a,d)=>{console.log(d)})

interface StudentSchema {
  id;
  name;
}

class Student implements StudentSchema {
  id;
  name;

  // derived columns for JSON output 
  totalAverage;
  courses; // final join from mark belongs to -> test belongs to -> course

  // join columns
  marks;
  tests;
  static indexToRowMap;
  static all;

  constructor(id, name){
    this.id = Number(id);
    this.name = name;
    this.totalAverage = NaN;
    this.courses = [];
  }


  
}

let p = new CsvTableParser<Student>('/../students.csv', Student)
p.readTableFile()



