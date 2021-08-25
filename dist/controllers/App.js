"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const asdf = __importStar(require("./App.test"));
console.log(asdf === , Student_1.Student);
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
        // console.log(Student.all, Mark.all, Test.all, Course.all);
        // console.log(JSON.stringify(this.#result, null, 2))
        fs_1.default.writeFile(this.outputFilePath, JSON.stringify(this.#result, null, 2), (err) => {
            if (err)
                throw err;
        });
    }
}
exports.default = new App();
