import { Course } from "./Course";
import { withPrimaryKey } from './BaseRecord';
import type { CourseRecord } from "./Course";
import type { MarkRecord } from "./Mark";
import type { PrimaryKey, ForeignKey } from './schema';
export interface TestSchema {
  id: PrimaryKey;         // PK
  course_id: ForeignKey;  // FK
  weight: number;         // weight col is validated that: all weights of every Course.tests adds to 100
}
interface TestComputed {
  marks: MarkRecord[];          // has_many marks
  course: CourseRecord;         // belongs_to_one course
}
export type TestRecord = TestSchema & TestComputed;
export class Test extends withPrimaryKey<TestRecord>() implements TestRecord {
  private _marks: MarkRecord[] = [];
  private _course!: CourseRecord; 
  public get marks(): MarkRecord[] {  // Passively wait for marks to join me
    return this._marks;
  }
  public set marks(value: MarkRecord[]) {
    this._marks = value;
  }
  public get course(): CourseRecord { // Actively need to join courses
    return this._course;
  }
  private set course(value: CourseRecord) {
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
      this.course = foundCourse;
    });
  }
}
export default Test

