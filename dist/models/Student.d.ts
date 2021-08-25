/// <reference path="BaseRecord.d.ts" />
/// <reference types="node" />
import type { MarkRecord } from './Mark';
import type { PrimaryKey } from './schema';
export interface StudentSchema {
    id: PrimaryKey;
    name: string;
}
interface StudentComputed {
    marks: MarkRecord[];
    totalAverage: number;
}
export declare type StudentRecord = StudentSchema & StudentComputed;
declare const Student_base: {
    new (): {};
    index: Map<number, StudentRecord>;
    all: StudentRecord[];
    import(fp: `${string}.csv`): Promise<void>;
    isLoadedEvent: import("node:events");
    isLoaded: boolean;
    find(id: number): Promise<StudentRecord>;
};
/**
 *
 *
 * @export
 * @class Student
 * @extends {withPrimaryKey<StudentRecord>()}
 * @implements {StudentRecord}
 */
export declare class Student extends Student_base implements StudentRecord {
    private _marks;
    private _totalAverage;
    get marks(): MarkRecord[];
    set marks(marks: MarkRecord[]);
    get totalAverage(): number;
    private set totalAverage(value);
    readonly id: PrimaryKey;
    readonly name: string;
    constructor(id: PrimaryKey, name: string);
}
export default Student;
