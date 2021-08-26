"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const BaseRecord_1 = require("./BaseRecord");
class Course extends BaseRecord_1.withPrimaryKey() {
    #_tests = []; // has_many
    #_totalWeight; // computed for validating 
    get tests() {
        return this.#_tests;
    }
    set tests(tests) {
        this.#_tests = tests;
        // below: calculating totalWeight since it only depends on tests
        let cumWeight = 0;
        for (const test of tests)
            cumWeight += test.weight;
        this.totalWeight = cumWeight;
    }
    get totalWeight() {
        return this.#_totalWeight;
    }
    set totalWeight(value) {
        this.#_totalWeight = value;
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
    // for every course, is sum(course.tests) = 100?
    static areTestWeightsValid() {
        for (const course of this.all) {
            if (course.totalWeight !== 100)
                return false;
        }
        return true;
    }
}
exports.Course = Course;
exports.default = Course;
