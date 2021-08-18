type ForeignKey =  number;
type Mark = any; 
type Course = any;
type PrimaryKey = number 

interface StudentSchema {
  id: PrimaryKey;
  name: string;
}
interface StudentComputed {
  marks: Mark; // join
  totalAverage: number // for view
  courses: Course; // for view
}
interface StudentRecord extends StudentSchema, StudentComputed {}


import Controller from "../abstract/Controller";
import Parser from "../Parsing/Parser";

export class StudentController extends Controller<Student> {
  create(s: Student): boolean
  create(id: PrimaryKey, name: string): boolean
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

// for a model class Student, there is a students table
// Student subs AppRecord ?
// any record can either be foreign keyed, primary keyed, or primary and foreign keyed
abstract class PrimaryKeyedRecord {
  public id: PrimaryKey

  public static index: Map<PrimaryKey, PrimaryKeyedRecord> = new Map()
  public static get all(): PrimaryKeyedRecord[] {
    // parse here?
    return [...this.index.values()]
  }
  public static isLoaded: boolean = false; 
  public static load(){
    this.isLoaded = true
    new CsvTableParser(Student).run('/../students.csv').then( ({headers, records}) => {
      console.log(headers, records)
    })
  }
  public static find(id: PrimaryKey): PrimaryKeyedRecord | undefined {
    return this.index.get(id)
  }
  protected constructor(id: PrimaryKey){
    this.id = id
  }
}


export class Student extends PrimaryKeyedRecord implements StudentRecord {
  // accessors to joins and computed values; dependent on other tables
  private _marks!: Mark[]; // has-many
  private _courses!: Course[]; // has-many
  private _totalAverage!: number; // computed
  public get courses(): Course[] {
    return this._courses;
  }
  public set courses(value: Course[]) {
    this._courses = value;
  }
  public get totalAverage(): number {
    return this._totalAverage;
  }
  public set totalAverage(value: number) {
    this._totalAverage = value;
  }
  public get marks(): Mark[] {
    return this._marks;
  }
  public set marks(value: Mark[]) {
    this._marks = value;
  }
  // intrinsic to students table
  public override id: PrimaryKey;
  public name: string;
  public constructor(id: PrimaryKey, name: string){
    super(id)
    this.id = Number(id);
    this.name = name;
  }
}

export default {
  StudentController,
  Student
}


Student.load()