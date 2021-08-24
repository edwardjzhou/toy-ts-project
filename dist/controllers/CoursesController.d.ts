import { BaseController } from "./BaseController";
import { Course, CourseSchema } from '../models/Course';
import { Mark } from '../models/Mark';
import type { StudentRecord } from '../models/Student';
declare type CoursesIndex = Required<CoursesShow>[];
declare type CoursesShow = {
    courseAverage?: number;
} & CourseSchema;
export declare class CoursesController extends BaseController<Course> {
    create(): void;
    index(m: Mark[]): CoursesShow[];
    index(s: StudentRecord): CoursesIndex;
    show(c: Course, courseAverage?: number): CoursesShow;
    update(): void;
}
export default CoursesController;
