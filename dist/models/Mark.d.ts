import { Test } from './Test';
import { Student } from './Student';
import { BaseRecord } from './BaseRecord';
import type { ForeignKey, Grade } from './schema';
export interface MarkSchema {
    test_id: ForeignKey;
    student_id: ForeignKey;
    mark: Grade;
}
interface MarkComputed {
    test: Test;
    student: Student;
}
declare type MarkRecord = MarkSchema & MarkComputed;
declare const Mark_base: ((abstract new (...args: any[]) => {}) & {
    index: MarkRecord[];
    all: MarkRecord[];
    load(fp?: `${string}.csv`): Promise<void>;
    isLoaded: boolean;
    find<FKName extends import("./schema").ForeignKeyPropNamesInSchema<MarkRecord>, FKValue extends MarkRecord[FKName]>(prop: FKName, value: FKValue): Promise<MarkRecord | undefined>;
}) & typeof BaseRecord;
export declare class Mark extends Mark_base implements MarkRecord {
    private _weightedMark;
    private _test;
    private _student;
    get test(): Test;
    private set test(value);
    get student(): Student;
    private set student(value);
    get weightedMark(): number;
    private set weightedMark(value);
    readonly test_id: ForeignKey;
    readonly student_id: ForeignKey;
    readonly mark: Grade;
    constructor(test_id: ForeignKey, student_id: ForeignKey, mark: Grade);
}
declare const _default: {
    Mark: typeof Mark;
};
export default _default;
