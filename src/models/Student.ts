import { UsePrimaryKeyedStatics } from '../abstract/BaseRecord'
import type { Mark, Course } from './schema'
import type { PrimaryKey, Grade } from './types'
export interface StudentSchema {
  id: PrimaryKey;
  name: string;
}
interface StudentComputed {
  marks: Mark;          // join with FKed Mark.student_id
  totalAverage: Grade  // computed for view
  courses: Course;      // computed for view via FKs Mark.student_id -> Mark.test_id -> Test.course_id -> Course(s)
}
type StudentRecord = StudentSchema & StudentComputed

// for a model class Student, there is a students table
// Student subs AppRecord ?
// any record can either be foreign keyed, primary keyed, or primary and foreign keyed
export class Student extends UsePrimaryKeyedStatics() implements StudentRecord {
  // accessors to joins and computed values; dependent on other tables
  private _marks!: Mark[]; // has-many
  private _courses!: Course[]; // has-many via marks table := COURSES.find(  MARKS.find(student_id).course_id  ) 
  private _totalAverage!: Grade; // computed

  public get marks(): Mark[] {
    return this._marks;
  }
  public set marks(value: Mark[]) {
    this._marks = value;
  }
  public get courses(): Course[] {
    return this._courses;
  }
  public set courses(value: Course[]) {
    this._courses = value;
  }
  public get totalAverage(): Grade {
    return this._totalAverage;
  }
  public set totalAverage(value: Grade) {
    this._totalAverage = value;
  }
  // intrinsic to students table
  public id: PrimaryKey;
  public name: string;
  public constructor(id: PrimaryKey, name: string){
    super(id)
    this.id = Number(id);
    this.name = name;
  }
}

export default {
  Student
}


const Edward = new Student(1, "Edward")
console.log(Student.load)
Student.load().then( ()=> {
    console.log(Student.all)
  }
)