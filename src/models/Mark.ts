import { Test } from './Test';
import type { TestRecord } from './Test';
import { Student } from './Student';
import type { StudentRecord } from './Student';
import { withoutPrimaryKey } from './BaseRecord';
import type { ForeignKey, Grade } from './schema'

export interface MarkSchema {
  test_id: ForeignKey;   
  student_id: ForeignKey; 
  mark: Grade;            
}
interface MarkComputed {
    test: TestRecord;          // belongs-to-one
    student: StudentRecord;    // belongs-to-one
    weightedMark: number;      // computed
}
export type MarkRecord = MarkSchema & MarkComputed;
export class Mark extends withoutPrimaryKey<MarkRecord>() implements MarkRecord {
    private _weightedMark!: number;        // computed for view calculation: mark.test.weight / 100 * mark.mark
    private _test!: TestRecord;            // FK association
    private _student!: StudentRecord;      // FK association
    public get test(): TestRecord {
      return this._test;
    }
    private set test(test: TestRecord) {
      this.weightedMark = test.weight;
      this._test = test;
    }
    public get student(): StudentRecord {
      return this._student;
    }
    private set student(student: StudentRecord) {
      this._student = student;
    }
    public get weightedMark(): number {
      return this._weightedMark
    }
    private set weightedMark(testWeight: number) {
      const roundedWeightedMark = testWeight * this.mark / 100
      this._weightedMark = roundedWeightedMark;
    }
    public readonly test_id: ForeignKey;
    public readonly student_id: ForeignKey;
    public readonly mark: Grade;
    public constructor(test_id: ForeignKey, student_id: ForeignKey, mark: Grade){
      super();
      this.test_id = Number(test_id);
      this.student_id = Number(student_id);
      this.mark = <Grade>Number(mark);
      Test.find(this.test_id).then(foundTest => {
        foundTest.marks = [...foundTest.marks, this];
        this.test = foundTest;
      })
      Student.find(this.student_id).then(foundStudent => {
        foundStudent.marks = [...foundStudent.marks, this];
        this.student = foundStudent;
      })
    }
}

export default Mark