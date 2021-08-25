import { AppFileTypes } from './namespaces/AppFileTypes';
import type { Model } from './../models/schema';
declare type Csv = typeof AppFileTypes.csv;
declare type Json = typeof AppFileTypes.json;
declare type FilePath<T = Csv> = T extends string ? `${string}.${T}` : never;
export declare type CsvFilePath = FilePath<Csv>;
export declare type JsonFilePath = FilePath<Json>;
export declare const JSONPath: (path: string) => JsonFilePath;
export declare const isCsvFilePathOrThrow: (path: string) => path is `${string}.csv`;
declare type header = string;
interface Table<T> {
    headers: header[];
    records: T[];
}
export declare class CsvTableParser {
    private model;
    constructor(model: Model);
    run(filePath: FilePath<Csv>): Promise<Table<any>>;
    read(rawData: string): [header[], string[]];
    private readRows;
    private readHeaders;
    clean(rowsStringsArray: string[]): void;
    private cleanRowStrings;
    transform(rowsStringsArray: string[]): void;
    private transformRowStringsToModelObjects;
}
declare const _default: {
    CsvTableParser: typeof CsvTableParser;
};
export default _default;
