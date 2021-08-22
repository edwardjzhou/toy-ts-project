"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _App_result, _App_studentsController, _App_coursesController, _App_marksController;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppControl = void 0;
const fs_1 = __importDefault(require("fs"));
const Course_1 = require("./../models/Course");
const Mark_1 = require("./../models/Mark");
const Test_1 = require("./../models/Test");
const Student_1 = require("./../models/Student");
const StudentsController_1 = require("./StudentsController");
const MarksController_1 = __importDefault(require("./MarksController"));
const CoursesController_1 = __importDefault(require("./CoursesController"));
class App {
    constructor() {
        _App_result.set(this, void 0);
        _App_studentsController.set(this, new StudentsController_1.StudentsController());
        _App_coursesController.set(this, new CoursesController_1.default());
        _App_marksController.set(this, new MarksController_1.default());
        __classPrivateFieldSet(this, _App_studentsController, new StudentsController_1.StudentsController(), "f");
        __classPrivateFieldSet(this, _App_coursesController, new CoursesController_1.default(), "f");
        __classPrivateFieldSet(this, _App_marksController, new MarksController_1.default(), "f");
    }
    async migrate() {
        await this.loadCsvRecords();
        await this.joinAndComputeRecords();
    }
    async loadCsvRecords() {
        if (process.argv.length < 7)
            throw Error('need (course, student, test, mark, and output) args');
        const coursesFilePath = process.argv[2], studentsFilePath = process.argv[3], testsFilePath = process.argv[4], marksFilePath = process.argv[5], outputFilePath = process.argv[6];
        const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath];
        const models = [Course_1.Course, Student_1.Student, Test_1.Test, Mark_1.Mark];
        const allLoads = models.map((model, i) => model.load(paths[i]));
        await Promise.all(allLoads);
    }
    async joinAndComputeRecords() {
    }
    render() {
        if (!Course_1.Course.areTestWeightsValid()) {
            __classPrivateFieldSet(this, _App_result, {
                "error": "Invalid course weights"
            }, "f");
        }
        else {
            console.log(Student_1.Student.all, Mark_1.Mark.all);
            const students = [];
            for (const student of __classPrivateFieldGet(this, _App_studentsController, "f").index()) {
                const current = {
                    ...__classPrivateFieldGet(this, _App_studentsController, "f").show(student),
                    courses: __classPrivateFieldGet(this, _App_coursesController, "f").index(student)
                };
                students.push(current);
            }
            __classPrivateFieldSet(this, _App_result, {
                students
            }, "f");
        }
        __classPrivateFieldSet(this, _App_result, JSON.stringify(__classPrivateFieldGet(this, _App_result, "f"), null, 2), "f");
        fs_1.default.writeFile('./../output1.json', __classPrivateFieldGet(this, _App_result, "f"), err => {
            if (err)
                throw err;
        });
        return __classPrivateFieldGet(this, _App_result, "f");
    }
}
_App_result = new WeakMap(), _App_studentsController = new WeakMap(), _App_coursesController = new WeakMap(), _App_marksController = new WeakMap();
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
exports.AppControl = new AppController();
