"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const BaseRecord_1 = require("./BaseRecord");
class Course extends BaseRecord_1.withPrimaryKey() {
    _tests; // has_many
    _totalWeight; // computed for validating and then for  view
    get tests() {
        return this._tests;
    }
    set tests(value) {
        this._tests = value;
    }
    get totalWeight() {
        return this._totalWeight;
    }
    set totalWeight(value) {
        this._totalWeight = value;
    }
    id;
    name;
    teacher;
    constructor(id, name, teacher) {
        super();
        this.id = Number(id);
        this.name = name;
        this.teacher = teacher;
    }
}
exports.Course = Course;
exports.default = { Course };
// const c = new Course(1,'math101','edward')
// console.log(c)
// Course.load().then( () => {
//     console.log(Course.all)
//     console.log(Object.getPrototypeOf(Object.getPrototypeOf(Course)).isLoaded)
//     console.log(Object.getPrototypeOf(Course).isLoaded)
//     console.log(Course.isLoaded)
//   }
// )
