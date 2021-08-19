import fs from 'fs';
// import Course from './Course';
import { Student } from './Student';
import { StudentController } from '../controllers/StudentController'
// import Test from './Test';
// import Mark from './Mark';

function isPrimaryKeyed(aModelClassInstance: any): aModelClassInstance is Student {
    return 'id' in aModelClassInstance 
}


export type Mark = any; 
export type Course = any;

export type Record = Student //| Test | Mark | Course 
export type Model = typeof Student

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