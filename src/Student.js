"use strict";
const Mark = require("./Mark");
class Student {
    constructor(id, name) {
        this.id = Number(id);
        this.name = name;
        this.totalAverage = NaN;
        this.courses = [];
    }
}
module.exports = Student;
