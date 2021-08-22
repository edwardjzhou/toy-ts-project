import { BaseController } from "./BaseController";
import { Course } from '../models/Course';
import { Mark } from '../models/Mark';
export declare class CoursesController extends BaseController<Course> {
    create(): void;
    index(arg: {
        marks: Mark[];
    } | Mark[]): {
        courseAverage?: any;
        id: import("../models/schema").PrimaryKey;
        name: string;
        teacher: string;
    }[];
    show(c: Course, courseAverage?: any): {
        courseAverage?: any;
        id: import("../models/schema").PrimaryKey;
        name: string;
        teacher: string;
    };
    update(): void;
}
export default CoursesController;
