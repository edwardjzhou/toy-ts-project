import { Mark } from './Mark';
import { Course } from './Course';
import { UsePrimaryKeyedStatics } from '../abstract/BaseRecord';
import type { PrimaryKey } from './types'

export interface StudentSchema {
  id: PrimaryKey;
  name: string;
}
interface StudentComputed {
  marks: Mark[];          // a student has_many marks; join with Mark.student_id
  totalAverage: number;   // computed for view (truncated to 2 decimals)
  courses: Course[];      // computed for view through FKs Student.id -> Mark.student_id -> Mark.test_id -> Test.course_id -> Distinct(Course)
}
type StudentRecord = StudentSchema & StudentComputed

// for a model class Student, there is a students table
// Student subs AppRecord ?
// any record can either be foreign keyed, primary keyed, or primary and foreign keyed
export class Student extends UsePrimaryKeyedStatics() implements StudentRecord {
  // accessors to joins and computed values; dependent on other tables
  private _marks!: Mark[]; // has-many
  private _courses!: Course[]; // has-many via marks table := COURSES.find(  MARKS.find(student_id).course_id  ) 
  private _totalAverage!: number; // computed
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
  public get totalAverage(): number {
    return this._totalAverage;
  }
  public set totalAverage(value: number) {
    this._totalAverage = value;
  }
  // intrinsic to students table
  public readonly id: PrimaryKey;
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







// const Edward = new Student(1, "Edward")

// Student.load().then( () => {
//     console.log(Student.all)
//     console.log(Object.getPrototypeOf(Object.getPrototypeOf(Student)).isLoaded)
//     console.log(Object.getPrototypeOf(Object.getPrototypeOf(Student)).all)
//     console.log(Student.isLoaded)
//   }
// )

// export function eur(value: number): EUR {
//   return value as any;
// }
// export function addEuros(a: EUR, b: EUR): EUR {
//   return ((a as any) + (b as any)) as any;
// }
// const result: EUR = addEuros(eur(1), eur(10)); // OK

// declare const tag: unique symbol
// export type EUR = { readonly [tag]: 'EUR' };

// console.log(eur(1))


// type RGBColor = number & {_type_: "RGBColor"};

// const rgb = (value: number): RGBColor => {
//   if (value < 0 || value > 255) {
//     throw new Error(`The value ${value} is not a valid color`);
//   }

//   return value as RGBColor;
// };

// Compiler errors
// const color1: RGBColor = 200; // fail - number is not RGBColor
// const color2: RGBColor = 300; // fail - number is not RGBColor

// Runtime error
// const color3: RGBColor = rgb(300); // fail - The value 300 is not a valid color

// // Pass
// const color4: RGBColor = rgb(100);
// const color5: RGBColor = rgb(255);