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
export declare type CourseRecord = CourseSchema & CourseComputed;
declare const Course_base: {
    new (): {};
    index: Map<number, any>;
    all: CourseRecord[];
    import(fp: `${string}.csv`): Promise<void>;
    isLoadedEvent: import("node:events");
    isLoaded: boolean;
    find(id: number): Promise<CourseRecord>;
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
