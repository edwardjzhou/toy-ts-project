/// <reference types="node" />
import { EventEmitter } from 'events';
import type { CsvFilePath } from './../parser/Parser';
import type { PrimaryKey, PKedRecord } from './schema';
declare module 'node:events';
export declare const withoutPrimaryKey: <T extends {
    id?: undefined;
} & import("./Mark").MarkSchema>() => {
    new (): {};
    index: T[];
    all: T[];
    import(fp: CsvFilePath): Promise<void>;
};
export declare const withPrimaryKey: <T extends PKedRecord>() => {
    new (): {};
    index: Map<PrimaryKey, any>;
    all: T[];
    import(fp: CsvFilePath): Promise<void>;
    isLoadedEvent: EventEmitter;
    isLoaded: boolean;
    /**
     *  (anonymous class).find is an async function in disguise
     *  We want:
     *  1. ordered resolution 2. no passing a cb
     *  for (1) we have to use events
     *  for (2) we have to use promises
     *  So we chose to return a promise that is resolved by a listener invocation,
     *  rather than by another promise (which would result in unordered resolutions)
     *  For a model m of models M, m's isLoadedEvent's cb
     *  resolves all associative m.find() promises
     *  before the m.import() promise resolves,
     *  and thus all records are whole before Promise.all(for m in M m.import()) resolves.
     * @static
     * @param id
     * @returns {(Promise<T> | never)}
     */
    find(id: PrimaryKey): Promise<T>;
};
declare const _default: {
    withoutPrimaryKey: <T extends {
        id?: undefined;
    } & import("./Mark").MarkSchema>() => {
        new (): {};
        index: T[];
        all: T[];
        import(fp: `${string}.csv`): Promise<void>;
    };
    withPrimaryKey: <T_1 extends PKedRecord>() => {
        new (): {};
        index: Map<number, any>;
        all: T_1[];
        import(fp: `${string}.csv`): Promise<void>;
        isLoadedEvent: EventEmitter;
        isLoaded: boolean;
        /**
         *  (anonymous class).find is an async function in disguise
         *  We want:
         *  1. ordered resolution 2. no passing a cb
         *  for (1) we have to use events
         *  for (2) we have to use promises
         *  So we chose to return a promise that is resolved by a listener invocation,
         *  rather than by another promise (which would result in unordered resolutions)
         *  For a model m of models M, m's isLoadedEvent's cb
         *  resolves all associative m.find() promises
         *  before the m.import() promise resolves,
         *  and thus all records are whole before Promise.all(for m in M m.import()) resolves.
         * @static
         * @param id
         * @returns {(Promise<T> | never)}
         */
        find(id: number): Promise<T_1>;
    };
};
export default _default;
