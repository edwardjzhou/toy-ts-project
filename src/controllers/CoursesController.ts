import { BaseController } from "./BaseController";
import { Course, CourseSchema } from '../models/Course';
import { Mark } from '../models/Mark';
import type { StudentRecord } from '../models/Student';

type CoursesIndex = Required<CoursesShow>[]
type CoursesShow = {
    courseAverage?: number;
} & CourseSchema;
export class CoursesController extends BaseController<Course> {
    public create(){}
    public index(m: Mark[]): CoursesShow[]
    public index(s: StudentRecord): CoursesIndex
    public index(arg: StudentRecord | Mark[]): CoursesShow[] {
        const marks = ("marks" in arg) ? arg.marks: arg;

        const distinctCourses = new Map();
        for (const mark of marks) {
            if (!distinctCourses.has(mark.test.course)) distinctCourses.set(mark.test.course, [mark.weightedMark]);
            else distinctCourses.get(mark.test.course).push(mark.weightedMark);
        }

        const courses = [];
        for(const [course, weightedMarkArray] of distinctCourses.entries()) {
            const averageWeightedMark = weightedMarkArray.reduce((acc: number, ele: number) => acc + ele, 0);
            const roundedAverageWeightedMark = Math.round(averageWeightedMark * 100) / 100; 
            courses.push(this.show(course, roundedAverageWeightedMark));
        }
        return courses;
    }
    public show(c: Course, courseAverage?: number): CoursesShow {
        const course = {
            id: c.id,
            name: c.name,
            teacher: c.teacher,
            ...((courseAverage != undefined) && { courseAverage })
        };
        return course;
    }
    public update(){} 
}

export default CoursesController

