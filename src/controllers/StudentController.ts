import { BaseController } from "../abstract/BaseController";
import { Student } from '../models/Student'

import type { StudentSchema } from '../models/Student'
import type { PrimaryKey } from "../models/types";

export class StudentController extends BaseController<Student> {
  public create(s: Student): boolean
  public create(id: PrimaryKey, name: string): boolean
  public create(obj: {id: number; name: string}): boolean
  public create<T extends StudentSchema>(obj: T): boolean
  public create(arg1: StudentSchema | Student | PrimaryKey, arg2?: string): boolean {
    let id, name, student;
    if (arg1 instanceof Student) {  // is already instantiated but not saved to in-memory index
      ( { id, name } = arg1)
      student = arg1
    } else if (typeof arg1 === 'number' && typeof arg2 === 'string'){// is of sufficient arity; correct order, and type but needs instantiation
      id = arg1 
      name = arg2 
      student = new Student(id, name)
    } else if (typeof arg1 === 'object') { // is an object of correct type (not yet destructured) but needs instantiation
      ( { id, name } = arg1)
      student = new Student(id, name)
    } else { // wrong types
      return false
    }
    if (!Number.isFinite(id)) return false // not a indexable number
    if (Student.index.has(id)) return false // not a unique primary key
    Student.index.set(id, student) // save to index 
    return true
  }
  public index(){
    return Student.all 
  }
  public show(){}
  public update(){} 
}

export default {
    StudentController
}