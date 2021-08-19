import { Test } from './Test';
import { Student } from './Student';

import type { ForeignKey, Grade } from './types'

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

export class Mark {
    // joins and computed
    private _weightedMark!: number;  // computed for veiw
    private _test!: Test;            // FK
    private _student!: Student;      // FK
    // join and computed members' accessors
    public get test(): Test {
      return this._test;
    }
    public set test(value: Test) {
      this._test = value;
    }
    public get student(): Student {
      return this._student;
    }
    public set student(value: Student) {
      this._student = value;
  }
    public get weightedMark(): number {
      let current; 
      current ??= this.test?.weight * this.mark;
      this.weightedMark = Math.round(current * 100) / 100;
      return this._weightedMark
    }
    public set weightedMark(value: number) {
      this._weightedMark = value;
    }

    // table data
    public test_id: ForeignKey;
    public student_id: ForeignKey;
    public mark: Grade;
    constructor(test_id: ForeignKey, student_id: ForeignKey, mark: Grade){
        this.test_id = Number(test_id);
        this.student_id = Number(student_id);
        this.mark = mark;
    }
}


export default {
    Mark
}