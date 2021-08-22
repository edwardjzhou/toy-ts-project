"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
const BaseRecord_1 = require("./BaseRecord");
class Student extends BaseRecord_1.withPrimaryKey() {
    constructor(id, name) {
        super();
        // accessors to joins and computed values; dependent on other tables
        this._marks = []; // has-many
        this.id = Number(id);
        this.name = name;
    }
    get marks() {
        return this._marks;
    }
    set marks(value) {
        this._totalAverage = Math.round(this.marks.reduce((acc, mark) => acc + mark.mark, 0) / this.marks.length);
        this._marks = value;
    }
    get totalAverage() {
        return this._totalAverage;
    }
    set totalAverage(value) {
        this._totalAverage = value;
    }
}
exports.Student = Student;
exports.default = Student;
