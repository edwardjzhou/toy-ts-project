"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mark = void 0;
const Test_1 = require("./Test");
const Student_1 = require("./Student");
const BaseRecord_1 = require("./BaseRecord");
class Mark extends BaseRecord_1.withoutPrimaryKey() {
    // joins and computed
    _weightedMark; // computed for view calculation: for course of Student(a student).courses => avg(mark)
    _test; // FK
    _student; // FK
    // join and computed members' accessors
    get test() {
        return this._test;
    }
    set test(test) {
        this.weightedMark = test.weight;
        this._test = test;
    }
    get student() {
        return this._student;
    }
    set student(student) {
        this._student = student;
    }
    get weightedMark() {
        return this._weightedMark;
    }
    set weightedMark(testWeight) {
        // const roundedWeightedMark = Math.round(testWeight * this.mark / 100);
        const roundedWeightedMark = testWeight * this.mark / 100;
        this._weightedMark = roundedWeightedMark;
    }
    // table
    test_id;
    student_id;
    mark;
    constructor(test_id, student_id, mark) {
        super();
        this.test_id = Number(test_id);
        this.student_id = Number(student_id);
        this.mark = Number(mark);
        Test_1.Test.find(this.test_id).then(foundTest => {
            foundTest.marks = [...foundTest.marks, this];
            this.test = foundTest;
        });
        Student_1.Student.find(this.student_id).then(foundStudent => {
            foundStudent.marks = [...foundStudent.marks, this];
            this.student = foundStudent;
        });
    }
}
exports.Mark = Mark;
exports.default = Mark;
