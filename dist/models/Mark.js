"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mark = void 0;
const BaseRecord_1 = require("./BaseRecord");
class Mark extends BaseRecord_1.withoutPrimaryKey(BaseRecord_1.BaseRecord) {
    // joins and computed
    _weightedMark; // computed for veiw
    _test; // FK
    _student; // FK
    // join and computed members' accessors
    get test() {
        return this._test;
    }
    set test(value) {
        this._test = value;
    }
    get student() {
        return this._student;
    }
    set student(value) {
        this._student = value;
    }
    get weightedMark() {
        let current;
        current ??= this.test?.weight * this.mark;
        this.weightedMark = Math.round(current * 100) / 100;
        return this._weightedMark;
    }
    set weightedMark(value) {
        this._weightedMark = value;
    }
    // table data
    test_id;
    student_id;
    mark;
    constructor(test_id, student_id, mark) {
        super();
        this.test_id = Number(test_id);
        this.student_id = Number(student_id);
        this.mark = Number(mark);
    }
}
exports.Mark = Mark;
exports.default = { Mark };
