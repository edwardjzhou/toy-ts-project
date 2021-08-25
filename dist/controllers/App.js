"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Course_1 = require("../models/Course");
const Mark_1 = require("../models/Mark");
const Test_1 = require("../models/Test");
const Student_1 = require("../models/Student");
const StudentsController_1 = require("./StudentsController");
const Parser_1 = require("../parser/Parser");
const studentsController = new StudentsController_1.StudentsController();
class App {
    #result;
    outputFilePath;
    run() {
        this.migrate().then(() => this.render());
    }
    migrate() {
        if (process.argv.length < 7)
            throw Error('need course, student, test, mark, and output args');
        const coursesFilePath = process.argv[2], studentsFilePath = process.argv[3], testsFilePath = process.argv[4], marksFilePath = process.argv[5];
        this.outputFilePath = Parser_1.JSONPath(process.argv[6]); // can throw
        const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath].filter(Parser_1.isCsvFilePathOrThrow); // can throw
        const models = [Course_1.Course, Student_1.Student, Test_1.Test, Mark_1.Mark];
        const allLoads = models.map((model, i) => model.import(paths[i]));
        return Promise.all(allLoads);
    }
    render() {
        if (!Course_1.Course.areTestWeightsValid()) {
            this.#result = {
                "error": "Invalid course weights"
            };
        }
        else {
            const students = studentsController.index();
            this.#result = {
                students
            };
        }
        console.log(Student_1.Student.all, Mark_1.Mark.all, Test_1.Test.all, Course_1.Course.all);
        console.log(JSON.stringify(this.#result, null, 2));
        fs_1.default.writeFile(this.outputFilePath, JSON.stringify(this.#result, null, 2), (err) => {
            if (err)
                throw err;
        });
    }
}
exports.default = new App();
