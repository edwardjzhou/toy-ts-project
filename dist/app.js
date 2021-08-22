"use strict";
/**
 * “node app.js courses.csv students.csv tests.csv marks.csv output.json”
 * for the principal's use, we assumed:
 * 1. small and static data (in-memory with index-to-row maps for each csv file)
 * 2. valid command line args
 * 3. tractable csv files (we don't use a parser; idealized input; no regex)
 * tsc src/* --outDir dist --allowJs
 * ts-node '/Users/edward/Desktop/hatchways_fullstack/src/app' courses.csv students.csv tests.csv marks.csv output.json
*/
Object.defineProperty(exports, "__esModule", { value: true });
const Course_1 = require("./models/Course");
const Mark_1 = require("./models/Mark");
const Test_1 = require("./models/Test");
const Student_1 = require("./models/Student");
class App {
    #results = null;
    migrate() {
        if (process.argv.length < 7)
            throw Error('need (course, student, test, mark, and output) args');
        const coursesFilePath = process.argv[2], studentsFilePath = process.argv[3], testsFilePath = process.argv[4], marksFilePath = process.argv[5], outputFilePath = process.argv[6];
        const models = [Student_1.Student, Course_1.Course, Test_1.Test, Mark_1.Mark];
        const allLoads = models.map(model => model.load());
        Promise.all(allLoads).then(() => console.log(Student_1.Student.all, Mark_1.Mark.all));
    }
    join() { }
    validate() {
        // const areTestWeightsValid = Test.validateTestWeights(this.tests);
        // if (areTestWeightsValid === false) {
        //   result = {
        //     "error": "Invalid course weights"
        //   };
        // } else {
        //   this.students.sort(student => student.id)
        // }
        // result = JSON.stringify(result, null, 2)
        // fs.writeFile('output1.json', result, err => {
        //   if (err) throw err
        // })
        // console.log(1123,this)
        //   }
        // }
    }
}
new App().migrate();
