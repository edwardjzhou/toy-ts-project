"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import AbstractController from "../abstracts/Controller"
class Student {
    constructor(id, name) {
        this.id = Number(id);
        this.name = name;
        this.totalAverage = NaN;
        this.courses = [];
    }
}
exports.default = Student;
