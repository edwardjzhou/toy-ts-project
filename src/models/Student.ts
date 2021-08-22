import { Course } from './Course';
import { Mark } from './Mark';
import { withPrimaryKey } from './BaseRecord';
import type { PrimaryKey } from './schema'
export interface StudentSchema {
  id: PrimaryKey;
  name: string;
}
interface StudentComputed {
  marks: Mark[];          // a student has_many marks; join a student with Mark.student_id
  totalAverage: number;   // computed for view (truncated to 2 decimals)
}
type StudentRecord = StudentSchema & StudentComputed;
export class Student extends withPrimaryKey<StudentRecord>() implements StudentRecord {
  // accessors to joins and computed values; dependent on other tables
  private _marks: Mark[] = [];    // has-many
  private _totalAverage!: number; // computed
  public get marks(): Mark[] {
    return this._marks;
  }
  public set marks(value: Mark[]) {
    this._totalAverage = this.marks.reduce((acc, mark) => acc + <number>mark.mark, 0)
    this._marks = value;
  }
  public get totalAverage(): number {
    return this._totalAverage;
  }
  private set totalAverage(value: number) {
    this._totalAverage = value;
  }
  // read from csv table
  public readonly id: PrimaryKey;
  public readonly name: string;
  public constructor(id: PrimaryKey, name: string){
    super();
    this.id = Number(id);
    this.name = name;    
  }
}
export default { Student }






// const Edward = new Student(156, "Edward")

// Student.load().then( () => {
//     console.log(Student.all)
//     console.log(Object.getPrototypeOf(Object.getPrototypeOf(Student)).isLoaded)
//     console.log(Object.getPrototypeOf(Object.getPrototypeOf(Student)).all)
//     console.log(Student.isLoaded, Student.find(1), Object.getPrototypeOf(Student.find(1)))
//   }
// )









// // export function eur(value: number): EUR {
// //   return value as any;
// // }
// // export function addEuros(a: EUR, b: EUR): EUR {
// //   return ((a as any) + (b as any)) as any;
// // }
// // const result: EUR = addEuros(eur(1), eur(10)); // OK

// // declare const tag: unique symbol
// // export type EUR = { readonly [tag]: 'EUR' };

// // console.log(eur(1))


// // type RGBColor = number & {_type_: "RGBColor"};

// // const rgb = (value: number): RGBColor => {
// //   if (value < 0 || value > 255) {
// //     throw new Error(`The value ${value} is not a valid color`);
// //   }

// //   return value as RGBColor;
// // };

// // Compiler errors
// // const color1: RGBColor = 200; // fail - number is not RGBColor
// // const color2: RGBColor = 300; // fail - number is not RGBColor

// // Runtime error
// // const color3: RGBColor = rgb(300); // fail - The value 300 is not a valid color

// // // Pass
// // const color4: RGBColor = rgb(100);
// // const color5: RGBColor = rgb(255);