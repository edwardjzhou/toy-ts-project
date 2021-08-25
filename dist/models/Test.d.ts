/// <reference path="BaseRecord.d.ts" />
/// <reference types="node" />
import type { CourseRecord } from "./Course";
import type { MarkRecord } from "./Mark";
import type { PrimaryKey, ForeignKey } from './schema';
export interface TestSchema {
    id: PrimaryKey;
    course_id: ForeignKey;
    weight: number;
}
interface TestComputed {
    marks: MarkRecord[];
    course: CourseRecord;
}
export declare type TestRecord = TestSchema & TestComputed;
declare const Test_base: {
    new (): {};
    index: Map<number, any>;
    all: TestRecord[];
    import(fp: `${string}.csv`): Promise<void>;
    isLoadedEvent: import("node:events");
    isLoaded: boolean;
    find(id: number): Promise<TestRecord>;
};
export declare class Test extends Test_base implements TestRecord {
    private _marks;
    private _course;
    get marks(): MarkRecord[];
    set marks(value: MarkRecord[]);
    get course(): CourseRecord;
    private set course(value);
    readonly id: PrimaryKey;
    readonly course_id: ForeignKey;
    readonly weight: number;
    constructor(id: PrimaryKey, course_id: ForeignKey, weight: number);
}
export default Test;
