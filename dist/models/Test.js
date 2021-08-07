"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Course = require("./Course");
class Test {
    constructor(id, course_id, weight) {
        this.id = Number(id);
        this.course_id = Number(course_id);
        this.weight = Number(weight);
    }
    // a test belongs to one course
    get course() {
        this._course ||= Course.indexToRowMap.get(this.course_id);
        return this._course;
    }
    // validates that the weights of all tests of a course add to exactly 100
    static validateTestWeights() {
        const map = new Map(); // maps a course to all of its tests' cumulative weight
        for (const test of [...Test.indexToRowMap.values()]) {
            const thisTestsCourseId = test.course_id;
            const thisTestsWeight = test.weight;
            const oldAccumWeightForThisCourseId = map.get(thisTestsCourseId) ?? 0;
            const newAccumWeightForThisCourseId = oldAccumWeightForThisCourseId + thisTestsWeight;
            map.set(thisTestsCourseId, newAccumWeightForThisCourseId);
        }
        for (const [course_id, accumWeight] of map)
            if (accumWeight !== 100)
                return false;
        return true;
    }
}
exports.default = Test;
// type hey<T> = T extends string ? string : number
// let hi: hey<string>  =  'hey'
