import { BaseController } from "./BaseController";
import { Student } from './../models/Student';
import type { StudentRecord } from './../models/Student';
import CoursesController from './CoursesController';

type StudentsShow = {
  id: number;
  name: string;
  totalAverage: number;
};
export type StudentsIndex = {
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
const coursesController = new CoursesController();
export class StudentsController extends BaseController<StudentRecord> {
  public index(): StudentsIndex {
    const index = [];
    const students = Student.all.sort((a,b) => a.id > b.id ? 1: (a.id < b.id ? -1: 0));
    for (const student of students) {
      const courseAverages = [];
      const courses = coursesController.index(student);
      for (const course of courses){
        courseAverages.push(course.courseAverage);
      }

      const sumAverages = courseAverages.reduce((acc, ele) => acc + ele, 0)
      student.totalAverage = Math.round( sumAverages / courseAverages.length * 100) / 100;
      index.push({
        ...this.show(student),
        courses
      });
    }
    return index;
  }

  public show({ id, name, totalAverage }: StudentRecord): StudentsShow {
    const student = {
      id,
      name,
      totalAverage
    };
    return student;
  }
  public update(){} 
}
export default StudentsController
