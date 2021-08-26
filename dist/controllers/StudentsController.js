"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const BaseController_1 = require("./BaseController");
const Student_1 = require("./../models/Student");
const CoursesController_1 = __importDefault(require("./CoursesController"));
const coursesController = new CoursesController_1.default();
class StudentsController extends BaseController_1.BaseController {
    index() {
        const index = [];
        const students = Student_1.Student.all.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0));
        for (const student of students) {
            const courseAverages = [];
            const courses = coursesController.index(student);
            for (const course of courses) {
                courseAverages.push(course.courseAverage);
            }
            student.totalAverage = Math.round(courseAverages.reduce((acc, ele) => acc + ele) / courseAverages.length * 100) / 100;
            index.push({
                ...this.show(student),
                courses
            });
        }
        return index;
    }
    show({ id, name, totalAverage }) {
        const student = {
            id,
            name,
            totalAverage
        };
        return student;
    }
    update() { }
}
exports.StudentsController = StudentsController;
exports.default = StudentsController;
