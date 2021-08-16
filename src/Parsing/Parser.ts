import fs from 'fs';
import { Module } from 'module';

namespace FileTypes {
  export const csv = 'csv'
}
type Csv = typeof FileTypes.csv;
type FilePath<T> = T extends string ? `${string}.${T}` : never; 
type CsvFilePath = FilePath<Csv>

 
let sFile: CsvFilePath = '/../students.csv'

interface Promised<T> {
    isReadyPromise: Promise<T>;
    isReadyPromiseResolver: (v: T) => void;
} 

abstract class Parser<T = Csv, U, V extends new()=>{}> implements Promised<U> {
  public isReadyPromiseResolver!: (v: U) => void; 
  public isReadyPromise: Promise<U> = new Promise(res => {this.isReadyPromiseResolver = res});
  public path: FilePath<T>;

  constructor(path: FilePath<T>) {
    this.path = path;
  }

  getProperty<T, K extends keyof T>(t: T, k: K) {
    return t[k];
  }

  read(){
    fs.readFile(__dirname + this.path, 'utf8' , (err, rawData) => {
        if (err) throw err;
        const cleanedData = this.clean(rawData)
        const mappedData = this.map(cleanedData)
        this.resolveReady(mappedData)
    })
    return this.isReadyPromise
  }

  abstract clean(rawData: U): any
  abstract map(cleanedData: V): any

  resolveReady(data: any){
      this.isReadyPromiseResolver(data);
  }
}




type StringToArray<S extends string> = S extends `${infer first}${infer rest}` ? [first, ...StringToArray<rest>] : S extends '' ? [] : [S]
type LengthOfString<S extends string> = StringToArray<S>['length']




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



interface Table<T> {
    headers: string[];
    rows: string[];
    model: T; 
}

interface StudentTable {
  id: unknown;
  name: string;
}
class TableParser<M extends new()=>{}> extends Parser<Csv, string> implements Table<StudentTable> {
  modelObjects: M[];
  headers: string[];
  rows: string[];
  model: M;

  constructor(path, model) {
      super(path)
      this.model = model;
  }

  // @measure
  override read() {
    return super.read()
  }

  override clean(){

  }

  override map(){

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





