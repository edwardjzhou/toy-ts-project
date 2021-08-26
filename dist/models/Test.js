"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const Course_1 = require("./Course");
const BaseRecord_1 = require("./BaseRecord");
const final_1 = __importDefault(require("./../parser/decorators/final"));
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
__decorate([
    final_1.default
], Test.prototype, "_course", void 0);
exports.Test = Test;
exports.default = Test;
