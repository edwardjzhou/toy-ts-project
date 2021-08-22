import { Test } from './Test';
import { Student } from './Student';
import { withoutPrimaryKey, BaseRecord } from './BaseRecord';
import type { ForeignKey, Grade } from './schema'

export interface MarkSchema {
  test_id: ForeignKey;    // FK
  student_id: ForeignKey; // FK
  mark: Grade;            // 0-100 whole numbers
}
interface MarkComputed {
    test: Test;          // belongs-to-one
    student: Student;    // belongs-to-one
}
type MarkRecord = MarkSchema & MarkComputed;
export class Mark extends withoutPrimaryKey<MarkRecord, typeof BaseRecord>(BaseRecord) implements MarkRecord {
    // joins and computed
    private _weightedMark!: number;  // computed for view calculation: for course of Student(a student).courses => avg(mark)
    private _test!: Test;            // FK
    private _student!: Student;      // FK
    // join and computed members' accessors
    public get test(): Test {
      return this._test;
    }
    private set test(test: Test) {
      this.weightedMark = test.weight;
      this._test = test;
    }
    public get student(): Student {
      return this._student;
    }
    private set student(student: Student) {
      this._student = student;
    }
    public get weightedMark(): number {
      return this._weightedMark
    }
    private set weightedMark(testWeight: number) {
      // const roundedWeightedMark = Math.round(testWeight * this.mark / 100);
      const roundedWeightedMark = testWeight * this.mark / 100
      this._weightedMark = roundedWeightedMark;
    }
    // table
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
        this.test = <Test>foundTest;
      })
      Student.find(this.student_id).then(foundStudent => {
        foundStudent.marks = [...foundStudent.marks, this];
        this.student = <Student>foundStudent;
      })
    }
}

export default Mark