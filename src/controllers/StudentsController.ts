import { BaseController } from "./BaseController";
import { Student } from './../models/Student'
import type { StudentSchema, StudentRecord } from './../models/Student'
import type { PrimaryKey } from "./../models/schema";
export class StudentsController extends BaseController<Student> {
  public create(s: Student): boolean
  public create(id: PrimaryKey, name: string): boolean
  public create(obj: {id: number; name: string}): boolean
  public create<T extends StudentSchema>(obj: T): boolean
  public create(arg1: StudentSchema | Student | PrimaryKey, arg2?: string): boolean {
    let id, name, student;
    if (arg1 instanceof Student) { // instantiated, not yet saved to in-memory index
      ( { id, name } = arg1);
      student = arg1;
    } else if (typeof arg1 === 'number' && typeof arg2 === 'string'){ // not instantiated, sufficient arity and correct order
      id = arg1;
      name = arg2;
      student = new Student(id, name);
    } else if (typeof arg1 === 'object') { // not instantiated, is an object of correct type
      ( { id, name } = arg1);
      student = new Student(id, name);
    } else { // wrong types
      return false;
    }
    if (!Number.isFinite(id)) return false;  // not an indexable number
    if (Student.index.has(id)) return false; // not an unique primary key
    Student.index.set(id, student);          // save to index 
    return true;
  }
  public index(): StudentRecord[] {
    const students = Student.all.sort((a,b) => a.id > b.id ? 1: (a.id < b.id ? -1: 0));
    return students;
  }
  public show({ id, name, totalAverage }: Partial<Student>): Partial<Student>{
    const student = {
      id: id,
      name: name,
      totalAverage: totalAverage
    };
    return student;
  }
  public update(){} 
}
export default StudentsController
