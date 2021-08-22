import { BaseController } from "./BaseController";
import { Student } from './../models/Student';
import type { StudentSchema, StudentRecord } from './../models/Student';
import type { PrimaryKey } from "./../models/schema";
export declare class StudentsController extends BaseController<Student> {
    create(s: Student): boolean;
    create(id: PrimaryKey, name: string): boolean;
    create(obj: {
        id: number;
        name: string;
    }): boolean;
    create<T extends StudentSchema>(obj: T): boolean;
    index(): StudentRecord[];
    show({ id, name, totalAverage }: Partial<Student>): Partial<Student>;
    update(): void;
}
export default StudentsController;
