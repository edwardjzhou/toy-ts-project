"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const BaseRecord_1 = require("./BaseRecord");
class Student extends BaseRecord_1.withPrimaryKey() {
    // accessors to joins and computed values; dependent on other tables
    _marks; // has-many
    _courses; // has-many via marks table := COURSES.find(  MARKS.find(student_id).course_id  ) 
    _totalAverage; // computed
    get marks() {
        return this._marks;
    }
    set marks(value) {
        this._marks = value;
    }
    get courses() {
        return this._courses;
    }
    set courses(value) {
        this._courses = value;
    }
    get totalAverage() {
        return this._totalAverage;
    }
    set totalAverage(value) {
        this._totalAverage = value;
    }
    // read from csv table
    id;
    name;
    constructor(id, name) {
        super();
        this.id = Number(id);
        this.name = name;
    }
}
exports.Student = Student;
exports.default = { Student };
const Edward = new Student(156, "Edward").emit('hello');
debugger
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
