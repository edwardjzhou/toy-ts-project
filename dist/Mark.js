var Test = require('./Test'), Student = require('./student'), Course = require('./Course');
var Mark = /** @class */ (function () {
    function Mark(test_id, student_id, mark) {
        this.test_id = Number(test_id);
        this.student_id = Number(student_id);
        this.mark = Number(mark);
    }
    Mark.prototype.makeJoins = function () {
        this.test;
        this.student;
        this.course;
    };
    Object.defineProperty(Mark.prototype, "test", {
        // a mark belongs to one test
        get: function () {
            this._test || (this._test = Test.indexToRowMap.get(this.test_id));
            return this._test;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "student", {
        // a mark belongs to one student
        get: function () {
            this._student || (this._student = Student.indexToRowMap.get(this.student_id));
            return this._student;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "course", {
        // a test belongs to one course
        get: function () {
            var _a;
            this._course || (this._course = this.test.course);
            //a student has many DISTINCT courses
            (_a = this.student).courses || (_a.courses = new Map());
            // a mark belongs to both a student and a course
            if (this.student.courses.has(this._course)) {
                this.student.courses.get(this._course).push(this);
            }
            else {
                this.student;
            }
            ww;
            return this._course;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Mark.prototype, "weightedMark", {
        get: function () {
            this._weightedMark || (this._weightedMark = this.test.weight * this.mark);
            return this._weightedMark;
        },
        enumerable: false,
        configurable: true
    });
    return Mark;
}());
module.exports = Mark;
