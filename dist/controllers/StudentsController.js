"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentsController = void 0;
const BaseController_1 = require("./BaseController");
const Student_1 = require("./../models/Student");
class StudentsController extends BaseController_1.BaseController {
    create(arg1, arg2) {
        let id, name, student;
        if (arg1 instanceof Student_1.Student) { // instantiated, not yet saved to in-memory index
            ({ id, name } = arg1);
            student = arg1;
        }
        else if (typeof arg1 === 'number' && typeof arg2 === 'string') { // not instantiated, sufficient arity and correct order
            id = arg1;
            name = arg2;
            student = new Student_1.Student(id, name);
        }
        else if (typeof arg1 === 'object') { // not instantiated, is an object of correct type
            ({ id, name } = arg1);
            student = new Student_1.Student(id, name);
        }
        else { // wrong types
            return false;
        }
        if (!Number.isFinite(id))
            return false; // not an indexable number
        if (Student_1.Student.index.has(id))
            return false; // not an unique primary key
        Student_1.Student.index.set(id, student); // save to index 
        return true;
    }
    index() {
        const students = Student_1.Student.all.sort((a, b) => a.id > b.id ? 1 : (a.id < b.id ? -1 : 0));
        return students;
    }
    //a student has many courses THROUGH many marks THROUGH belongs_to tests; 
    // THROUGH associations are not in my models and the controller deals with it
    show({ id, name, totalAverage }) {
        const student = {
            id: id,
            name: name,
            totalAverage: totalAverage
        };
        return student;
    }
    update() { }
}
exports.StudentsController = StudentsController;
exports.default = StudentsController;
