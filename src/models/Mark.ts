// import Test from './Test';
import { Student } from './Student';
// import Course from './Course';

type Course = any;
type ForeignKey = number;
type mark = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
interface MarkSchema {
  test_id: ForeignKey;
  student_id: ForeignKey;
  mark: mark; 
}
interface MarkComputed {
    student: Student; // belongs-to-one
    test: Test; // belongs-to-one
}
interface MarkRecord extends MarkSchema, MarkComputed {}


import Controller from "../abstract/Controller";
import Parser from "../Parsing/Parser";

export class MarkController extends Controller<Mark> {
  create(m: Mark): boolean
  create(test_id: PrimaryKey, name: string): boolean
  create(obj: {id: number; name: string}): boolean
  create<T extends StudentSchema>(obj: T): boolean
  public create(arg1: StudentSchema | Student | PrimaryKey, arg2?: string): boolean {
    var id, name, student;
    if (arg1 instanceof Student) { 
      // is already instantiated but not saved to in-memory index
      ( { id, name } = arg1)
      student = arg1
    } else if (typeof arg1 === 'number' && typeof arg2 === 'string'){
      // is of sufficient arity; correct order, and type but needs instantiation
      id = arg1 
      name = arg2 
      student = new Student(id, name)
    } else if (typeof arg1 === 'object') {
      // is an object of correct type (not yet destructured) but needs instantiation
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



import { CsvTableParser } from '../Parsing/Parser'


export default class Mark {
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


