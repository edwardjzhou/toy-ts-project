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
/**
*
* @template T extends @type PKedRecord
* @return df
*/
export declare const withPrimaryKey: <T extends PKedRecord>() => {
    new (): {};
    index: Map<number, T>;
    all: T[];
    import(fp: CsvFilePath): Promise<void>;
    isLoadedEvent: EventEmitter;
    isLoaded: boolean;
    /**
     *  find() is basically an async function.
     *  We write it this way since we need an ordered resolution of promises.
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
        index: Map<number, T_1>;
        all: T_1[];
        import(fp: `${string}.csv`): Promise<void>;
        isLoadedEvent: EventEmitter;
        isLoaded: boolean;
        /**
         *  find() is basically an async function.
         *  We write it this way since we need an ordered resolution of promises.
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
