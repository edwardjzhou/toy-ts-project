/// <reference types="node" />
import events from 'events';
import type { CsvFilePath } from './../parser/Parser';
import type { PrimaryKey, Model, Record, ForeignKeyPropNamesInSchema, PKSchema } from './schema';
declare type AbstractConstructor<T> = abstract new (...args: any[]) => T;
export declare abstract class BaseRecord {
    static LiterallyAllRecords: Map<Model, Record>;
    static index: Iterable<any>;
    static get all(): any;
    static set all(args: any);
}
export declare const withoutPrimaryKey: <T extends {
    id?: undefined;
} & import("./Mark").MarkSchema, U extends AbstractConstructor<BaseRecord>>(Base: U) => ((abstract new (...args: any[]) => {}) & {
    index: T[];
    all: T[];
    load(fp?: CsvFilePath): Promise<void>;
    isLoaded: boolean;
    find<FKName extends ForeignKeyPropNamesInSchema<T>, FKValue extends T[FKName]>(prop: FKName, value: FKValue): Promise<T | undefined>;
}) & U;
export declare const withPrimaryKey: <T extends PKSchema>() => {
    new (): {};
    load(fp?: CsvFilePath): Promise<void>;
    isLoadedEvent: events.EventEmitter;
    isLoaded: boolean;
    index: Map<PrimaryKey, T>;
    all: T[];
    find(id: PrimaryKey): Promise<T>;
    LiterallyAllRecords: Map<Model, Record>;
};
declare const _default: {
    BaseRecord: typeof BaseRecord;
    withoutPrimaryKey: <T extends {
        id?: undefined;
    } & import("./Mark").MarkSchema, U extends AbstractConstructor<BaseRecord>>(Base: U) => ((abstract new (...args: any[]) => {}) & {
        index: T[];
        all: T[];
        load(fp?: `${string}.csv`): Promise<void>;
        isLoaded: boolean;
        find<FKName extends ForeignKeyPropNamesInSchema<T>, FKValue extends T[FKName]>(prop: FKName, value: FKValue): Promise<T | undefined>;
    }) & U;
    withPrimaryKey: <T_1 extends PKSchema>() => {
        new (): {};
        load(fp?: `${string}.csv`): Promise<void>;
        isLoadedEvent: events;
        isLoaded: boolean;
        index: Map<PrimaryKey, T_1>;
        all: T_1[];
        find(id: PrimaryKey): Promise<T_1>;
        LiterallyAllRecords: Map<Model, Record>;
    };
};
export default _default;
