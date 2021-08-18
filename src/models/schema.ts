import fs from 'fs';
// import Course from './Course';
import { Student, StudentController } from './Student';
// import Test from './Test';
// import Mark from './Mark';

 
function hasPrimaryKey(arg: any): arg is Student {
    return 'marks' in arg.prototype
}


export type Record = Student //| Test | Mark | Course 
export type RecordModels =  Record
export type Model<T extends Record> = {
  new (...args: any[]): T
}

type test = ConstructorParameters<typeof Student>
type Controller =  StudentController// | CourseController | TestController | MarkController

// const coursesFilePath = process.argv[2],
// studentsFilePath = process.argv[3],
// testsFilePath = process.argv[4],
// marksFilePath = process.argv[5],
// outputFilePath = process.argv[6];


// interface Modeld {
//     new(): Record;
// }


// function createSchema(): Schema[] {
//   return [new Rhino(), new Elephant(), new Snake()];
// }