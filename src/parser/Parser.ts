import fs from 'fs';
import readline from 'readline';
import { measure } from './decorators/measure';

declare namespace AppFileTypes {
   const csv = 'csv';
   const json = 'json';
}
type Csv = typeof AppFileTypes.csv;
type Json = typeof AppFileTypes.json;
type FilePath<T> = T extends string ? `${string}.${T}`: never; 
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
export class CsvTableParser {  
  @measure
  public static create(fp: FilePath<Csv>): any {    
    return readline.createInterface({
      input: fs.createReadStream(fp),
      crlfDelay: Infinity
    });
  }
}

export default CsvTableParser 

