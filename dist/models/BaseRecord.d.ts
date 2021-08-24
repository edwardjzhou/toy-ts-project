/// <reference types="node" />
import { EventEmitter } from 'events';
import type { CsvFilePath } from './../parser/Parser';
import type { PrimaryKey, PKSchema } from './schema';
declare module 'node:events';
export declare const withoutPrimaryKey: <T extends {
    id?: undefined;
} & import("./Mark").MarkSchema>() => {
    new (): {};
    index: T[];
    all: T[];
    import(fp: CsvFilePath): Promise<void>;
};
export declare const withPrimaryKey: <T extends PKSchema>() => {
    new (): {};
    import(fp: CsvFilePath): Promise<void>;
    isLoadedEvent: EventEmitter;
    isLoaded: boolean;
    index: Map<number, T>;
    all: T[];
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
    withPrimaryKey: <T_1 extends PKSchema>() => {
        new (): {};
        import(fp: `${string}.csv`): Promise<void>;
        isLoadedEvent: EventEmitter;
        isLoaded: boolean;
        index: Map<number, T_1>;
        all: T_1[];
        find(id: number): Promise<T_1>;
    };
};
export default _default;
