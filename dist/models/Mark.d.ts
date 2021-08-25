import type { TestRecord } from './Test';
import type { StudentRecord } from './Student';
import type { ForeignKey, Grade } from './schema';
export interface MarkSchema {
    test_id: ForeignKey;
    student_id: ForeignKey;
    mark: Grade;
}
interface MarkComputed {
    test: TestRecord;
    student: StudentRecord;
    weightedMark: number;
}
export declare type MarkRecord = MarkSchema & MarkComputed;
declare const Mark_base: {
    new (): {};
    index: MarkRecord[];
    all: MarkRecord[];
    import(fp: `${string}.csv`): Promise<void>;
};
export declare class Mark extends Mark_base implements MarkRecord {
    private _weightedMark;
    private _test;
    private _student;
    get test(): TestRecord;
    private set test(value);
    get student(): StudentRecord;
    private set student(value);
    get weightedMark(): number;
    private set weightedMark(value);
    readonly test_id: ForeignKey;
    readonly student_id: ForeignKey;
    readonly mark: Grade;
    constructor(test_id: ForeignKey, student_id: ForeignKey, mark: Grade);
}
export default Mark;
