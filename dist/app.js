"use strict";
/**
 * “node app.js courses.csv students.csv tests.csv marks.csv output.json”
 * for the principal's use, we assumed:
 * 1. small and static data (in-memory with index-to-row maps for each csv file)
 * 2. valid command line args
 * 3. tractable csv files (we don't use a parser; idealized input; no regex)
 * tsc src/* --outDir dist --allowJs
 * node '/Users/edward/Desktop/hatchways_fullstack/dist/app.js' courses.csv students.csv tests.csv marks.csv output.json
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = __importDefault(require("./models/Course"));
const Student_1 = __importDefault(require("./models/Student"));
const Test_1 = __importDefault(require("./models/Test"));
const Mark_1 = __importDefault(require("./models/Mark"));
const coursesFilePath = process.argv[2], studentsFilePath = process.argv[3], testsFilePath = process.argv[4], marksFilePath = process.argv[5], outputFilePath = process.argv[6];
const appSchema = [
    [coursesFilePath, Course_1.default],
    [studentsFilePath, Student_1.default],
    [testsFilePath, Test_1.default],
    [marksFilePath, Mark_1.default]
];
// class App {  
//   async loadTables(){
//     const loadingTables = tableDescriptions.map(([path, OrmClass]) => {
//         return new Table(path, OrmClass)
//       })
//     // goes in order to first failure then breaks
//     for await (const loadedTable of loadingTables) {
//       console.log(loadedTable)
//     }
//   }
//   outputToJson(){
//     let result;
//     const areTestWeightsValid = Test.validateTestWeights(this.tests);
//     console.log(Student, this.students)
//     return
//     if (areTestWeightsValid === false) {
//       result = {
//         "error": "Invalid course weights"
//       };
//     } else {
//       this.students.sort(student => student.id)
//     }
//     result = JSON.stringify(result, null, 2)
//     fs.writeFile('output1.json', result, err => {
//       if (err) throw err
//     })
//     console.log(1123,this)
//   }
// }
// const principalsApp = new App().loadTables().then((results) => {
//       // this.outputJson();
//     })
//     .catch(err => {
//       console.warn(err.stack)
//       throw err;
//     });
//     /**
//  * To be called 70 to 80 days after {@link plantCarrot}.
//  */
// async function readAsyncIterable(dependentPromisesArray){
//   for await (const aPromiseResolution of dependentPromisesArray) {
//     console.log(aPromiseResolution)
//   }
// }
