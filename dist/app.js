"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * “node app.js courses.csv students.csv tests.csv marks.csv output.json”
 * for the principal's use, we assumed:
 * 1. small and static data (index-to-row maps for primary keyed csv files)
 * 2. valid command line args
 * 3. tractable csv files (we don't use a csv parser or filestreams; always-valid input; no regex)\
 * to compile: 1. tsc 2. the below
 * ts-node 'src/app.ts' courses.csv students.csv tests.csv marks.csv output.json
*/
const fs_1 = __importDefault(require("fs"));
const Course_1 = require("./models/Course");
const Mark_1 = require("./models/Mark");
const Test_1 = require("./models/Test");
const Student_1 = require("./models/Student");
class App {
    #result = null;
    run() {
        this.migrate();
        this.render();
    }
    migrate() {
        this.loadCsvRecords();
        this.joinRecords();
    }
    loadCsvRecords() {
        if (process.argv.length < 7)
            throw Error('need (course, student, test, mark, and output) args');
        const coursesFilePath = process.argv[2], studentsFilePath = process.argv[3], testsFilePath = process.argv[4], marksFilePath = process.argv[5], outputFilePath = process.argv[6];
        const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath];
        const models = [Course_1.Course, Student_1.Student, Test_1.Test, Mark_1.Mark];
        const allLoads = models.map((model, i) => model.load(paths[i]));
        // Promise.all(allLoads).then( ()=>
        //     console.log(Course.all, Student.all, Test.all, Mark.all)
        // )
        setTimeout(() => {
            console.log(Course_1.Course.all, Student_1.Student.all, Test_1.Test.all, Mark_1.Mark.all);
        }, 2000);
    }
    joinRecords() {
    }
    render() {
        if (!Course_1.Course.areTestWeightsValid()) {
            this.#result = {
                "error": "Invalid course weights"
            };
        }
        else {
            Student_1.Student.all.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0));
            this.#result = JSON.stringify(this.#result, null, 2);
            fs_1.default.writeFile('./../output1.json', this.#result, err => {
                if (err)
                    throw err;
            });
        }
    }
}
const principalsApp = new App().run();
