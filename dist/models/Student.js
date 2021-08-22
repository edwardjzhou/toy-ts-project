"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const BaseRecord_1 = require("./BaseRecord");
class Student extends BaseRecord_1.withPrimaryKey() {
    // accessors to joins and computed values; dependent on other tables
    _marks = []; // has-many
    _totalAverage; // computed
    get marks() {
        return this._marks;
    }
    set marks(marks) {
        let sumWeightedMarks = 0;
        let sumWeights = 0;
        for (const mark of marks) {
            sumWeightedMarks += mark.weightedMark;
            sumWeights += mark.test.weight;
        }
        const equivalentNumTests = sumWeights / 100;
        const exactAverageTotalWeightedMarks = sumWeightedMarks / equivalentNumTests;
        this._totalAverage = Math.round(exactAverageTotalWeightedMarks * 100) / 100;
        this._marks = marks;
    }
    get totalAverage() {
        return this._totalAverage;
    }
    set totalAverage(value) {
        this._totalAverage = value;
    }
    // read from csv table
    id;
    name;
    constructor(id, name) {
        super();
        this.id = Number(id);
        this.name = name;
    }
}
exports.Student = Student;
exports.default = Student;
