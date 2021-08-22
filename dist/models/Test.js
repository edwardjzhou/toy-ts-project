"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const Course_1 = require("./Course");
const BaseRecord_1 = require("./BaseRecord");
class Test extends BaseRecord_1.withPrimaryKey() {
    _marks = [];
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
    set course(value) {
        this._course = value;
    }
    id;
    course_id;
    weight;
    constructor(id, course_id, weight) {
        super();
        this.id = Number(id);
        this.course_id = Number(course_id);
        this.weight = Number(weight);
        Course_1.Course.find(this.course_id).then(foundCourse => {
            foundCourse.tests = [...foundCourse.tests, this];
            this.course = foundCourse;
        });
    }
}
exports.Test = Test;
exports.default = { Test };
