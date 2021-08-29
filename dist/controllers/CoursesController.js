"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoursesController = void 0;
const BaseController_1 = require("./BaseController");
class CoursesController extends BaseController_1.BaseController {
  create() {}
  index(arg) {
    const marks = "marks" in arg ? arg.marks : arg;
    const distinctCourses = new Map();
    for (const mark of marks) {
      if (!distinctCourses.has(mark.test.course))
        distinctCourses.set(mark.test.course, [mark.weightedMark]);
      else distinctCourses.get(mark.test.course).push(mark.weightedMark);
    }
    const courses = [];
    for (const [course, weightedMarkArray] of distinctCourses.entries()) {
      const averageWeightedMark = weightedMarkArray.reduce(
        (acc, ele) => acc + ele,
        0
      );
      const roundedAverageWeightedMark =
        Math.round(averageWeightedMark * 100) / 100;
      courses.push(this.show(course, roundedAverageWeightedMark));
    }
    return courses;
  }
  show(c, courseAverage) {
    const course = {
      id: c.id,
      name: c.name,
      teacher: c.teacher,
      ...(courseAverage != undefined && { courseAverage }),
    };
    return course;
  }
  update() {}
}
exports.CoursesController = CoursesController;
exports.default = CoursesController;
