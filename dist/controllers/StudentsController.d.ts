import { BaseController } from "./BaseController";
import type { StudentRecord } from './../models/Student';
declare type StudentsShow = {
    id: number;
    name: string;
    totalAverage: number;
};
export declare type StudentsIndex = {
    id: number;
    name: string;
    totalAverage: number;
    courses: {
        id: number;
        name: string;
        teacher: string;
        courseAverage: number;
    }[];
}[];
export declare class StudentsController extends BaseController<StudentRecord> {
    index(): StudentsIndex;
    show({ id, name, totalAverage }: StudentRecord): StudentsShow;
    update(): void;
}
export default StudentsController;
