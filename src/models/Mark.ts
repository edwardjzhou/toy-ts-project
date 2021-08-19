// import Test from './Test';
// import Course from './Course';
import { Student } from './Student';

import Controller from "../abstract/BaseController";
import { CsvTableParser } from '../Parsing/Parser'

import type { ForeignKey, Grade } from './types'
type Test = any;
type Course = any;
interface MarkSchema {
  test_id: ForeignKey;
  student_id: ForeignKey;
  mark: Grade;
}
interface MarkComputed {
    test: Test; // belongs-to-one
    student: Student; // belongs-to-one
}
interface MarkRecord extends MarkSchema, MarkComputed {}



export class MarkController extends Controller<Mark> {
  create(m: Mark): boolean
  create(test_id: PrimaryKey, name: string): boolean
  create(obj: {id: number; name: string}): boolean
  create<T extends MarkSchema>(obj: T): boolean
  public create(arg1: MarkSchema | Student | PrimaryKey, arg2?: string): boolean {
    var id, name, student;
    if (arg1 instanceof Student) { 
      // is already instantiated but not saved to in-memory index
      ( { id, name } = arg1)
      student = arg1
    } else if (typeof arg1 === 'number' && typeof arg2 === 'string'){
      // is of sufficient arity, correct order, and type; not yet instantiated
      id = arg1 
      name = arg2 
      student = new Student(id, name)
    } else if (typeof arg1 === 'object') {
      // is an object that contains k/vs of correct type (not yet destructured); not yet instantiated
      ( { id, name } = arg1)
      student = new Student(id, name)
    } else {
      // wrong types
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
export class Mark {
    test_id: number;
    student_id: number;
    mark: number;
    
    // joins
    private _test;
    private _student;
    // derived
    private _weightedMark;

    constructor(test_id, student_id, mark){
        this.test_id = Number(test_id);
        this.student_id = Number(student_id);
        this.mark = Number(mark);
    }

    makeJoins(){
        this.test;
        this.student;
        this.course;
    }

    // a mark belongs to one test
    get test(){
        this._test ||= Test.indexToRowMap.get(this.test_id);
        return this._test;
    }
    // a mark belongs to one student
    get student(){
        this._student ||= Student.indexToRowMap.get(this.student_id);
        return this._student;
    }
    // a test belongs to one course
    // get course(){
    //     this._course ||= this.test.course;

    //     //a student has many DISTINCT courses
    //     this.student.courses ||= new Map()
        
    //     // a mark belongs to both a student and a course
    //     if (this.student.courses.has(this._course)) {
    //         this.student.courses.get(this._course).push(this)
    //     } else {
    //         this.student
    //     }

    //     return this._course;
    // }

    get weightedMark(){
        this._weightedMark ||= this.test.weight*this.mark
        // Math.round(num * 100) / 100
        return this._weightedMark
    }
 


}


export default {
    Mark, 
    MarkController
}