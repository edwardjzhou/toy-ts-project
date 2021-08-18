import fs from 'fs';
import path from 'path';

import { measure } from './measure';
import { StringCleaning } from './StringCleaning';

import type { Model, Record } from '../models/schema'
import { Student } from 'models/Student';
namespace AppFileTypes {
  export const csv = 'csv';
}
type Csv = typeof AppFileTypes.csv;
type FilePath<T> = T extends string ? `${string}.${T}`: never; 
type CsvFilePath = FilePath<Csv>;
type header = string;

interface Table<T> {
    headers: header[];
    records: Record<T>[];
}

export class CsvTableParser {
  private model: Model;

  public constructor(model: Model){
    this.model = model;
  }

  getProperty<T, K extends keyof T>(t: T, k: K) {
    return t[k];
  }

  @measure
  // @ts-ignore
  public run(filePath: FilePath<Csv>): Promise<Table>{
    return new Promise(resolve => { 
        fs.readFile(path.join(__dirname, filePath), 'utf8' , (err, rawData) => {
          if (err) throw err;
          const [ headersArray , rowStringsArray ] = this.read(rawData)
          this.clean(rowStringsArray);
          this.transform(rowStringsArray)
          const result = { headers: headersArray, records: rowStringsArray as unknown as Record[]}
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
    const mapper = (rowString: string, i: number, arr: (string | Record)[]) => {
      arr[i] = new this.model(...rowString.split(','))
    }
    rowsStringsArray.forEach(mapper) // mutates
  }
}

export default {
  CsvTableParser
}







