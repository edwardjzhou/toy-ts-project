/// <reference types="node" />
import { EventEmitter } from 'events';
import { Mark } from './Mark';
import type { PrimaryKey } from './schema';
export interface StudentSchema {
    id: PrimaryKey;
    name: string;
}
interface StudentComputed {
    marks: Mark[];
    totalAverage: number;
}
export declare type StudentRecord = StudentSchema & StudentComputed;
declare const Student_base: {
    new (): {};
    load(fp?: `${string}.csv`): Promise<void>;
    isLoadedEvent: EventEmitter;
    isLoaded: boolean;
    index: Map<PrimaryKey, StudentRecord>;
    all: StudentRecord[];
    find(id: PrimaryKey): Promise<StudentRecord>;
    LiterallyAllRecords: Map<import("./schema").Model, import("./schema").Record>;
};
export declare class Student extends Student_base implements StudentRecord {
    private _marks;
    private _totalAverage;
    get marks(): Mark[];
    set marks(value: Mark[]);
    get totalAverage(): number;
    private set totalAverage(value);
    readonly id: PrimaryKey;
    readonly name: string;
    constructor(id: PrimaryKey, name: string);
}
export default Student;
