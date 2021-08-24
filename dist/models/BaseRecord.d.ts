/// <reference types="node" />
import { EventEmitter } from 'events';
import type { CsvFilePath } from './../parser/Parser';
import type { PrimaryKey, Model, Record, Schema, PKSchema } from './schema';
declare module 'node:events';
export declare abstract class BaseRecord {
    static LiterallyAllRecords: Map<Model, Record>;
    static index: Iterable<any>;
    static get all(): Schema[];
    static set all(arg: Schema[]);
}
export declare const withoutPrimaryKey: <T extends {
    id?: undefined;
} & import("./Mark").MarkSchema>() => {
    new (): {};
    index: T[];
    all: T[];
    load(fp?: CsvFilePath): Promise<void>;
    isLoaded: boolean;
    LiterallyAllRecords: Map<Model, Record>;
};
export declare const withPrimaryKey: <T extends PKSchema>() => {
    new (): {};
    load(fp: CsvFilePath): Promise<void>;
    isLoadedEvent: EventEmitter;
    isLoaded: boolean;
    index: Map<number, T>;
    all: T[];
    find(id: PrimaryKey): Promise<T>;
    LiterallyAllRecords: Map<Model, Record>;
};
declare const _default: {
    BaseRecord: typeof BaseRecord;
    withoutPrimaryKey: <T extends {
        id?: undefined;
    } & import("./Mark").MarkSchema>() => {
        new (): {};
        index: T[];
        all: T[];
        load(fp?: `${string}.csv`): Promise<void>;
        isLoaded: boolean;
        LiterallyAllRecords: Map<Model, Record>;
    };
    withPrimaryKey: <T_1 extends PKSchema>() => {
        new (): {};
        load(fp: `${string}.csv`): Promise<void>;
        isLoadedEvent: EventEmitter;
        isLoaded: boolean;
        index: Map<number, T_1>;
        all: T_1[];
        find(id: number): Promise<T_1>;
        LiterallyAllRecords: Map<Model, Record>;
    };
};
export default _default;
