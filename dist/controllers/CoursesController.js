"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const BaseController_1 = require("./BaseController");
class CoursesController extends BaseController_1.BaseController {
    create() { }
    index(arg) {
        if ("marks" in arg)
            arg = arg.marks;
        const distinctCourses = new Map();
        for (const mark of arg) {
            if (!distinctCourses.has(mark.test.course))
                distinctCourses.set(mark.test.course, [mark.weightedMark]);
            else
                distinctCourses.get(mark.test.course).push(mark.weightedMark);
        }
        const courses = [];
        for (const [course, weightedMarkArray] of distinctCourses.entries()) {
            const average = weightedMarkArray.reduce((acc, ele) => acc + ele, 0);
            const roundedAverage = Math.round(average * 100) / 100;
            courses.push(this.show(course, roundedAverage));
        }
        return courses;
    }
    show(c, courseAverage) {
        const course = {
            id: c.id,
            name: c.name,
            teacher: c.teacher,
            ...((courseAverage != undefined) && { courseAverage })
        };
        return course;
    }
    update() { }
}
exports.CoursesController = CoursesController;
exports.default = CoursesController;
//   Course {
//     _tests: [ [Test], [Test], [Test] ],
//     _totalWeight: 100,
//     id: 1,
//     name: 'Biology',
//     teacher: 'Mr. D'
//   },
