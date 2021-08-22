import { BaseController } from "./BaseController";
import { Student } from '../models/Student';
import { Course } from '../models/Course';
import { Mark } from '../models/Mark';
import { Test } from '../models/Test';

export class CoursesController extends BaseController<Course> {
    public create(){}
    public index(arg: { marks: Mark[] } | Mark[]){
        if ("marks" in arg) arg = arg.marks;

        const distinctCourses = new Map();
        for (const mark of arg) {
            if (!distinctCourses.has(mark.test.course)) distinctCourses.set(mark.test.course, [mark.weightedMark]);
            else distinctCourses.get(mark.test.course).push(mark.weightedMark);
        }

        const courses = [];
        for(const [course, weightedMarkArray] of distinctCourses.entries()) {
            const average = weightedMarkArray.reduce((acc: number, ele: number) => acc + ele, 0);
            const roundedAverage = Math.round(average * 100) / 100; 
            courses.push(this.show(course, roundedAverage));
        }
        return courses;
    }
    public show(c: Course, courseAverage?: any){
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


//   Course {
//     _tests: [ [Test], [Test], [Test] ],
//     _totalWeight: 100,
//     id: 1,
//     name: 'Biology',
//     teacher: 'Mr. D'
//   },