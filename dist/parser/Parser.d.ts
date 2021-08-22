import { AppFileTypes } from './namespaces/AppFileTypes';
import type { Model } from './../models/schema';
declare type Csv = typeof AppFileTypes.csv;
declare type FilePath<T = Csv> = T extends string ? `${string}.${T}` : never;
export declare type CsvFilePath = FilePath<Csv>;
declare type header = string;
interface Table {
    headers: header[];
    records: any[];
}
export declare class CsvTableParser {
    private model;
    constructor(model: Model);
    run(filePath: FilePath<Csv>): Promise<Table>;
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
