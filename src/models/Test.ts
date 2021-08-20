import { Course } from "./Course";
import { Student } from "./Student";
import { Mark } from "./Mark";
import { UsePrimaryKeyedStatics } from '../abstract/BaseRecord'

import type { PrimaryKey, Grade, ForeignKey } from './types'

export interface TestSchema {
  id: PrimaryKey;         // PK
  course_id: ForeignKey;  // FK
  weight: number;         // weight col is validated that: all weights of every Course.tests adds to 100
}
interface TestComputed {
  marks: Mark[];          // has_many marks
  course: Course;         // belongs_to_one course
}
type TestRecord = TestSchema & TestComputed;

export class Test extends UsePrimaryKeyedStatics() implements TestRecord {
  private _marks!: Mark[];
  private _course!: Course; 
  public get marks(): Mark[] { // wait for marks to join me
    return this._marks;
  }
  public set marks(value: Mark[]) {
    this._marks = value;
  }
  public get course(): Course { // i need to join courses
    return this._course;
  }
  public set course(value: Course) {
    this._course = value;
  }

  public id: PrimaryKey;
  public course_id: ForeignKey;
  public weight: number;
  public constructor(id: PrimaryKey, course_id: ForeignKey, weight: number){
    super(id)
    this.id = Number(id);
    this.course_id = Number(course_id);
    this.weight = Number(weight);
  }

}

export default {
  Test
}

