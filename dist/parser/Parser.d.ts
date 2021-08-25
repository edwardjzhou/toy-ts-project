import { AppFileTypes } from './namespaces/AppFileTypes';
declare type Csv = typeof AppFileTypes.csv;
declare type Json = typeof AppFileTypes.json;
declare type FilePath<T> = T extends string ? `${string}.${T}` : never;
export declare type CsvFilePath = FilePath<Csv>;
export declare type JsonFilePath = FilePath<Json>;
export declare const JSONPath: (path: string) => JsonFilePath;
export declare const isCsvFilePathOrThrow: (path: string) => path is `${string}.csv`;
export declare class CsvTableParser {
    static create(fp: FilePath<Csv>): any;
}
declare const _default: {
    CsvTableParser: typeof CsvTableParser;
};
export default _default;
