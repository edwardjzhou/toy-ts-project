import { Test } from './Test';
import { Student } from './Student';
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
declare const Mark_base: {
    new (): {};
    index: MarkRecord[];
    all: MarkRecord[];
    load(fp?: `${string}.csv`): Promise<void>;
    isLoaded: boolean;
    LiterallyAllRecords: Map<import("./schema").Model, import("./schema").Record>;
};
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
export default Mark;
