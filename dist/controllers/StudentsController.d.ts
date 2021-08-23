import { BaseController } from "./BaseController";
import { Student } from './../models/Student';
import type { StudentRecord } from './../models/Student';
export declare class StudentsController extends BaseController<Student> {
    index(): StudentRecord[];
    show({ id, name, totalAverage }: Partial<Student>): Partial<Student>;
    update(): void;
}
export default StudentsController;
