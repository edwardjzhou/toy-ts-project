type ForeignKey = {
  readonly id: number;
} 
type Mark = any; 
type Course = any;

// start student
type PrimaryKey = number 
// PrimaryKeyed<constructor>
type PrimaryKeyed<T extends new () => {} > = {
  all: () => T[],
  index: {
    has(k: PrimaryKey): k is PrimaryKey,
    get(k: PrimaryKey): T,
    set(k: PrimaryKey, v: T): PrimaryKeyed<T>,
  },
  addKey(k: PrimaryKey): void;
}

interface StudentTable {
  id: unknown;
  name: string;
}
interface StudentComputed {
  marks: Mark; // join
  totalAverage: number // for view
  courses: Course; // for view
}
interface StudentSchema extends StudentTable, StudentComputed {}



class ApplicationController {
  public parsers: any[];
  public readonly modelCtors:any[];

  constructor(parsers: any[], modelCtors: any[]){
    this.parsers = parsers
    this.modelCtors = modelCtors
  }

  loadFiles(){}
  parseCsv(){}
  computeJoins(){}
  validate(){}
  makeJsonView(){}
}

// FKed vs PKed joins-- FK is the aggressor
abstract class Controller {
  constructor(){}

  static [P: string]: symbol | undefined
  loadRecords(a: any): any {
  }
  mapRecords(){}


}

const useIndex: <T extends new()=>{}>(Base: T) => T = (Base) => {
  abstract class Z extends Base {
    constructor(...args: any[]){
      super()
    }
    // private static index: Map<PrimaryKey, Student> = new Map()
    // static createIndex(){}
  }
  return Z
}


class StudentController extends useIndex(Controller) {

  private static index: Map<PrimaryKey, Student> = new Map()
  public static get all(): Student[]{
    return [...this.index.values()]
  }
 
  protected static addKey(this: typeof Student, s: Student, id: PrimaryKey): id is PrimaryKey {
    if (!Number.isFinite(id)) return false
    if (this.index.has(s.id)) return false
    this.index.set(s.id, s)
    return true
  }
  
  public load(a: any): any{

  }

  makeUnique<T>(
    collection: Set<T> | T[],
    comparer: (x: T, y: T) => number
  ): Set<T> | T[] {
    // Early bail-out if we have a Set.
    // We assume the elements are already unique.
    if (collection instanceof Set) {
      return collection;
    }
    // Sort the array, then remove consecutive duplicates.
    collection.sort(comparer);
    for (let i = 0; i < collection.length; i++) {
      let j = i;
      while (
        j < collection.length &&
        comparer(collection[i], collection[j + 1]) === 0
      ) {
        j++;
      }
      collection.splice(i + 1, j - i);
    }
    return collection;
  }

}

export default class Student extends StudentController implements StudentSchema {
  #id: string | number;
  readonly id: PrimaryKey = NaN;
  public name: string;
  public marks: Mark;
  private _courses: Course[] = [];
  private _totalAverage: number = NaN;

/**
 *  
 *
 * @type {Course[]}
 * @memberof Student
 */
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

  constructor(id: unknown, name: string){
    super()
    this.id = this.#id = Number(id)
    if (!new.target.addKey(this, this.#id)) throw TypeError('id not PK; or not unique')
    this.name = name;
    this.totalAverage = NaN;
    this.courses = [];
  }

}

let s: Student = new Student('34',  'dsf')
let s2: Student = new Student(2,  'dsf')
class A extends StudentController {
}
console.log(Student.all)
console.log(A.all)

// s2.df = 34

// function hey({a=534, b=11}: {a?: number, b?: number} = {}) {
//   console.log(a,b)
// }

// hey({a:1})
// hey()

// type Lookup<T, K> = K extends keyof T ? T[K] : never;
// type TupleFromInterface<T, K extends Array<keyof T>> = { [I in keyof K]: Lookup<T, K[I]> }

// declare class Repo<T, K extends Array<keyof T>> {
//   add(item: T | TupleFromInterface<T, K>): UUID;
// }

type hey = {
  [id:number]: any
}
abstract class Controller {
    static [P: string]: symbol | Function;
    abstract readRecords(a: any): any;
    abstract parseRecords(a: any): any;
    abstract mapRecords(a: any): any;
    abstract connectRecords(a: any): any;
    abstract validateRecords(a: any): any;
    abstract computeRecords(a: any): any;
    abstract viewRecords(a: any): any;
}


const PKindexer = (Base: typeof Controller) => {
  abstract class PKer extends Base {
        private static index: Map<string, string> = new Map()
        public static find_by(id: any){

        }
        constructor(...args: any[]){
            super()
        }
        override loadRecords(a:any):any{}
        static createIndex(){}
    }
    return PKer
}

const FKsearcher = (Base: Controller) => {
    abstract class FKer extends Base {
        constructor(...args: any[]){
            super()
        }
        private static index: Map<string, string> = new Map()
        static createIndex(){}
    }
    return FKer
}

class StudentController extends PKindexer(Controller) {
    constructor(){
        super()
    }
}


export default abstract class Controller<T extends Model> {
    constructor(cls: typeof Model){
        
        if (cls.id) {
        }
    }
    // aka show, findOne
    static findById(){}

    createFromImport(){}
    
    // 1.create objs 2. run query 3.format for json 
    createView(){}

    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html
    makeUnique<T>(
        collection: Set<T> | T[],
        comparer: (x: T, y: T) => number
    ): Set<T> | T[] {

        if (collection instanceof Set) return collection;
    
    // Sort the array, then remove consecutive duplicates.
    collection.sort(comparer);
    for (let i = 0; i < collection.length; i++) {
        let j = i;
        while (
        j < collection.length &&
        comparer(collection[i], collection[j + 1]) === 0
        ) {
        j++;
        }
        collection.splice(i + 1, j - i);    
    }
    return collection;
    }

}

let c = new Controller<MyModel>(MyModel);