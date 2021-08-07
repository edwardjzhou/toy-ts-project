"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Test_1 = __importDefault(require("./Test"));
const Student_1 = __importDefault(require("./Student"));
class Mark {
    constructor(test_id, student_id, mark) {
        this.test_id = Number(test_id);
        this.student_id = Number(student_id);
        this.mark = Number(mark);
    }
    makeJoins() {
        this.test;
        this.student;
        this.course;
    }
    // a mark belongs to one test
    get test() {
        this._test ||= Test_1.default.indexToRowMap.get(this.test_id);
        return this._test;
    }
    // a mark belongs to one student
    get student() {
        this._student ||= Student_1.default.indexToRowMap.get(this.student_id);
        return this._student;
    }
    // a test belongs to one course
    get course() {
        this._course ||= this.test.course;
        //a student has many DISTINCT courses
        this.student.courses ||= new Map();
        // a mark belongs to both a student and a course
        if (this.student.courses.has(this._course)) {
            this.student.courses.get(this._course).push(this);
        }
        else {
            this.student;
        }
        return this._course;
    }
    get weightedMark() {
        this._weightedMark ||= this.test.weight * this.mark;
        // Math.round(num * 100) / 100
        return this._weightedMark;
    }
}
exports.default = Mark;
