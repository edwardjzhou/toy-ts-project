"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.show = exports.update = exports.AppControllerSingleton = void 0;
const fs_1 = __importDefault(require("fs"));
const Course_1 = require("./../models/Course");
const Mark_1 = require("./../models/Mark");
const Test_1 = require("./../models/Test");
const Student_1 = require("./../models/Student");
const StudentsController_1 = require("./StudentsController");
const MarksController_1 = __importDefault(require("./MarksController"));
const CoursesController_1 = __importDefault(require("./CoursesController"));
class App {
    #result;
    #studentsController = new StudentsController_1.StudentsController();
    #coursesController = new CoursesController_1.default();
    #marksController = new MarksController_1.default();
    migrate() {
        return this.loadCsvRecords().then(() => this);
    }
    loadCsvRecords() {
        if (process.argv.length < 7)
            throw Error('need (course, student, test, mark, and output) args');
        const coursesFilePath = process.argv[2], studentsFilePath = process.argv[3], testsFilePath = process.argv[4], marksFilePath = process.argv[5], outputFilePath = process.argv[6];
        const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath];
        const models = [Course_1.Course, Student_1.Student, Test_1.Test, Mark_1.Mark];
        const allLoads = models.map((model, i) => model.load(paths[i]));
        return Promise.all(allLoads);
    }
    render() {
        // console.log(Student.all, Mark.all, Test.all, Course.all)
        if (!Course_1.Course.areTestWeightsValid()) {
            this.#result = {
                "error": "Invalid course weights"
            };
        }
        else {
            const students = [];
            for (const student of this.#studentsController.index()) {
                const current = {
                    ...this.#studentsController.show(student),
                    courses: this.#coursesController.index(student)
                };
                students.push(current);
            }
            this.#result = {
                students
            };
        }
        this.#result = JSON.stringify(this.#result, null, 2);
        console.log(this.#result);
        fs_1.default.writeFile('./output1.json', this.#result, (err) => {
            if (err)
                throw err;
        });
        return this.#result;
    }
}
class AppController {
    create() {
        return new App();
    }
    show(app) {
        return app.render();
    }
    update(app) {
        return app.migrate();
    }
}
exports.AppControllerSingleton = new AppController();
exports.update = AppController.prototype.update;
exports.show = AppController.prototype.show;
exports.default = { AppControllerSingleton: exports.AppControllerSingleton, update: exports.update, show: exports.show };
