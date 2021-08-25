import fs from 'fs';
import { measure } from './decorators/measure';
import { StringCleaning } from './modules/StringCleaning';
import { AppFileTypes } from './namespaces/AppFileTypes';
import type { Model, Record, ModelRecord } from './../models/schema';

type Csv = typeof AppFileTypes.csv;
type Json = typeof AppFileTypes.json;
type FilePath<T = Csv> = T extends string ? `${string}.${T}`: never; 
export type CsvFilePath = FilePath<Csv>;
export type JsonFilePath = FilePath<Json>;
export const JSONPath = (path: string): JsonFilePath => {
  if (path.slice(path.length - 5) !== '.json') throw TypeError('output arg must end in .json')
  return path as JsonFilePath
}
export const isCsvFilePathOrThrow = (path: string): path is CsvFilePath | never => {
  if (path.slice(path.length - 4) !== '.csv') throw TypeError('args must end in .csv')
  return true
}

type header = string;
interface ParseResult {
    headers: header[];
    records: string[];
}
export class CsvTableParser {  
  @measure
  public run(filePath: FilePath<Csv>): Promise<ParseResult>{    

    
    // return new Promise(resolve => { 
    //     fs.readFile(filePath, 'utf8' , (err, rawData) => {
    //       if (err) throw err;
    //       const [ headersArray, rowStringsArray ] = this.read(rawData);
    //       this.clean(rowStringsArray); // mutates rowStringsArray only
    //       const result = { headers: headersArray, records: rowStringsArray };
    //       resolve(result);
    //     })
    // })
  }

  public read(rawData: string): [header[], string[]] {
    const headersArray = this.readHeaders(rawData);
    const rowStringsArray = this.readRows(rawData);
    return [headersArray, rowStringsArray];
  }
  private readRows(rawData: string): string[] {
    const splitByLine = rawData.split('\n'); 
    const rowStringsArray = splitByLine.slice(1);
    return rowStringsArray;
  }
  private readHeaders(rawData: string): header[] {
    const splitByLine = rawData.split('\n'); 
    const headersString = splitByLine[0];
    const headersArray = headersString.split(',');
    return headersArray;
  }

  public clean(rowsStringsArray: string[]): void {
    this.cleanRowStrings(rowsStringsArray);
  }
  private cleanRowStrings(rowsStringsArray: string[]): void {  // mutates array
      StringCleaning.removeEmptyStringsFromStringArray(rowsStringsArray); // mutates
      StringCleaning.removeSpacesAfterCommasFromStringArray(rowsStringsArray); // mutates
  }
}

export default { CsvTableParser }