"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mark = void 0;
const Test_1 = require("./Test");
const Student_1 = require("./Student");
const BaseRecord_1 = require("./BaseRecord");
class Mark extends BaseRecord_1.withoutPrimaryKey() {
    _weightedMark; // computed for view calculation: mark.test.weight / 100 * mark.mark
    _test; // FK association
    _student; // FK association
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
        const roundedWeightedMark = testWeight * this.mark / 100;
        this._weightedMark = roundedWeightedMark;
    }
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
