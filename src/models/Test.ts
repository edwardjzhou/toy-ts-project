import { EventEmitter, once } from 'events'

import { Course } from "./Course";
import { Mark } from "./Mark";
import { withPrimaryKey } from './BaseRecord'
import type { PrimaryKey, Grade, ForeignKey } from './schema'
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
export class Test extends withPrimaryKey<TestRecord>() implements TestRecord {
  private _marks: Mark[] = [];
  private _course!: Course; 
  public get marks(): Mark[] {  // Passively wait for marks to join me
    return this._marks;
  }
  public set marks(value: Mark[]) {
    this._marks = value;
  }
  public get course(): Course { // Actively need to join courses
    return this._course;
  }
  private set course(value: Course) {
    this._course = value;
  }
  public readonly id: PrimaryKey;
  public readonly course_id: ForeignKey;
  public readonly weight: number;
  public constructor(id: PrimaryKey, course_id: ForeignKey, weight: number){
    super();
    this.id = Number(id);
    this.course_id = Number(course_id);
    this.weight = Number(weight);
    Course.find(this.course_id).then(foundCourse => {
      foundCourse.tests = [...foundCourse.tests, this];
      this.course = <Course>foundCourse;
    });
  }
}
export default Test

