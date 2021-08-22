"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const BaseRecord_1 = require("./BaseRecord");
class Test extends BaseRecord_1.withPrimaryKey() {
    _marks;
    _course;
    get marks() {
        return this._marks;
    }
    set marks(value) {
        this._marks = value;
    }
    get course() {
        return this._course;
    }
    // Promise<Course>
    set course(value) {
        // value
        // this._course = value;
    }
    id;
    course_id;
    weight;
    constructor(id, course_id, weight) {
        super();
        this.id = Number(id);
        this.course_id = Number(course_id);
        this.weight = Number(weight);
        // this.course = Course.find(this.course_id)
    }
}
exports.Test = Test;
exports.default = { Test };
