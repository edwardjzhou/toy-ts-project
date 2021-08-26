"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mark = void 0;
const Test_1 = require("./Test");
const Student_1 = require("./Student");
const BaseRecord_1 = require("./BaseRecord");
const final_1 = __importDefault(require("./../parser/decorators/final"));
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
        if (mark > 100 || mark < 0)
            throw TypeError('a mark expects a mark between 0 and 100');
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
__decorate([
    final_1.default
], Mark.prototype, "_weightedMark", void 0);
__decorate([
    final_1.default
], Mark.prototype, "_test", void 0);
__decorate([
    final_1.default
], Mark.prototype, "_student", void 0);
exports.Mark = Mark;
exports.default = Mark;
