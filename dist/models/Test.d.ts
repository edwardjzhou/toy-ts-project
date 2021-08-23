/// <reference path="BaseRecord.d.ts" />
/// <reference types="node" />
import { Course } from "./Course";
import { Mark } from "./Mark";
import type { PrimaryKey, ForeignKey } from './schema';
export interface TestSchema {
    id: PrimaryKey;
    course_id: ForeignKey;
    weight: number;
}
interface TestComputed {
    marks: Mark[];
    course: Course;
}
declare type TestRecord = TestSchema & TestComputed;
declare const Test_base: {
    new (): {};
    load(fp?: `${string}.csv`): Promise<void>;
    isLoadedEvent: import("node:events");
    isLoaded: boolean;
    index: Map<PrimaryKey, TestRecord>;
    all: TestRecord[];
    find(id: PrimaryKey): Promise<TestRecord>;
    LiterallyAllRecords: Map<import("./schema").Model, import("./schema").Record>;
};
export declare class Test extends Test_base implements TestRecord {
    private _marks;
    private _course;
    get marks(): Mark[];
    set marks(value: Mark[]);
    get course(): Course;
    private set course(value);
    readonly id: PrimaryKey;
    readonly course_id: ForeignKey;
    readonly weight: number;
    constructor(id: PrimaryKey, course_id: ForeignKey, weight: number);
}
export default Test;
