import { BaseController } from "./BaseController";
import type { CourseRecord, CourseSchema } from '../models/Course';
import type { MarkRecord } from '../models/Mark';
import type { StudentRecord } from '../models/Student';
declare type CoursesIndex = Required<CoursesShow>[];
declare type CoursesShow = {
    courseAverage?: number;
} & CourseSchema;
export declare class CoursesController extends BaseController<CourseRecord> {
    create(): void;
    index(m: MarkRecord[]): CoursesShow[];
    index(s: StudentRecord): CoursesIndex;
    show(c: CourseSchema, courseAverage?: number): CoursesShow;
    update(): void;
}
export default CoursesController;
