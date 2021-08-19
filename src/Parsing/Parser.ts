import fs from 'fs';
import path from 'path';

import { measure } from './decorators/measure';
import { StringCleaning } from './modules/StringCleaning';
import { AppFileTypes } from './namespaces/AppFileTypes';

import type { Model, Record, RecordForModel } from '../models/schema';

import { Student } from '../models/Student'

type Csv = typeof AppFileTypes.csv;
type FilePath<T = Csv> = T extends string ? `${string}.${T}`: never; 
export type CsvFilePath = FilePath<Csv>;
type header = string;
interface Table {
    headers: header[];
    records: any[];
}

export class CsvTableParser<T extends Model, U extends RecordForModel<T> > {
  private model: T;

  public constructor(model: T){
    this.model = model;
  }

  // getProperty<T, K extends keyof T>(t: T, k: K) {
  //   return t[k];
  // }

  @measure
  public run(filePath: FilePath<Csv>): Promise<Table>{
    return new Promise(resolve => { 
        fs.readFile(path.join(__dirname, filePath), 'utf8' , (err, rawData) => {
          if (err) throw err;
          const [ headersArray , rowStringsArray ] = this.read(rawData)
          this.clean(rowStringsArray);
          this.transform(rowStringsArray)
          const result = { headers: headersArray, records: rowStringsArray as unknown as U[]}
          resolve(result)
        })
    })
  }


  public read(rawData: string): [header[], string[]] {
    const headersArray = this.readHeaders(rawData)
    const rowStringsArray = this.readRows(rawData)
    return [headersArray, rowStringsArray]
  }
  private readRows(rawData: string): string[] {
    const splitByLine = rawData.split('\n'); 
    const rowStringsArray = splitByLine.slice(1);
    return rowStringsArray
  }
  private readHeaders(rawData: string): header[] {
    const splitByLine = rawData.split('\n'); 
    const headersString = splitByLine[0]
    const headersArray = headersString.split(',');
    return headersArray
  }



  public clean(rowsStringsArray: string[]): void {
    this.cleanRowStrings(rowsStringsArray)
  }
  private cleanRowStrings(rowsStringsArray: string[]): void {  // mutates array
      StringCleaning.removeEmptyStringsFromStringArray(rowsStringsArray) // mutates
      StringCleaning.removeSpacesAfterCommasFromStringArray(rowsStringsArray); // mutates
  }



  public transform(rowsStringsArray: string[]): void {
    this.transformRowStringsToModelObjects(rowsStringsArray)
  }
  private transformRowStringsToModelObjects(rowsStringsArray: string[]): void { // mutates array
    const mapper = (rowString: string, i: number, arr: (string | Record )[]) => {
      const ctorArg = rowString.split(',') as [any,any,any]
      arr[i] = new this.model(...ctorArg)
    }
    rowsStringsArray.forEach(mapper) // mutates
  }
}

export default {
  CsvTableParser
}


// new CsvTableParser<typeof Student, Student>(Student)






