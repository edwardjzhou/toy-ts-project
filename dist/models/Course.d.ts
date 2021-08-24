/// <reference path="BaseRecord.d.ts" />
/// <reference types="node" />
import { Test } from './Test';
import type { PrimaryKey } from "./schema";
export interface CourseSchema {
    id: PrimaryKey;
    name: string;
    teacher: string;
}
interface CourseComputed {
    tests: Test[];
    totalWeight: number;
}
declare type CourseRecord = CourseSchema & CourseComputed;
declare const Course_base: {
    new (): {};
    load(fp: `${string}.csv`): Promise<void>;
    isLoadedEvent: import("node:events");
    isLoaded: boolean;
    index: Map<number, CourseRecord>;
    all: CourseRecord[];
    find(id: number): Promise<CourseRecord>;
    LiterallyAllRecords: Map<import("./schema").Model, import("./schema").Record>;
};
export declare class Course extends Course_base implements CourseRecord {
    private _tests;
    private _totalWeight;
    get tests(): Test[];
    set tests(tests: Test[]);
    get totalWeight(): number;
    private set totalWeight(value);
    id: PrimaryKey;
    name: string;
    teacher: string;
    constructor(id: PrimaryKey, name: string, teacher: string);
    static areTestWeightsValid(): boolean;
}
export default Course;
