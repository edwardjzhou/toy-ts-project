const Course = require("./Course");


type Mark = any; 
type Course = any;
interface TestTableSchema {
  id: PrimaryKey;
  course_id: ForeignKey;
  weight: number; //must add to 100
}
type ForeignKey = {
  readonly id: number;
} 


// start student
type PrimaryKey = number 
// PrimaryKeyed<constructor>
type PrimaryKeyed<T extends new () => {} > = {
  all: () => T[],
  index: {
    has(k: PrimaryKey): k is PrimaryKey
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


interface TestJoins {
  _course; // belongs to a course
  _marks; // has many marks belonging to myriad students
  // functions to make the joins? Test.marks(a student)
  // makeIndexRowmap
}
interface TestValidation {
  validateTestWeights;
}

interface TestSchema extends TestTableSchema, TestJoins, TestValidation {}

export default class Test implements TestSchema {
  id;
  course_id;
  weight;

  _course;
  static indexToRowMap;

  constructor(id, course_id, weight){
      this.id = Number(id);
      this.course_id = Number(course_id);
      this.weight = Number(weight);
  }

  // a test belongs to one course
  get course(){
    this._course ||= Course.indexToRowMap.get(this.course_id)
    return this._course
  }
  
  // validates that the weights of all tests of a course add to exactly 100
  static validateTestWeights(){
    const map = new Map(); // maps a course to all of its tests' cumulative weight
    for (const test of [...Test.indexToRowMap.values()]) {
      const thisTestsCourseId = test.course_id;
      const thisTestsWeight = test.weight;
      const oldAccumWeightForThisCourseId = map.get(thisTestsCourseId) ?? 0;
      const newAccumWeightForThisCourseId = oldAccumWeightForThisCourseId + thisTestsWeight;
      map.set(thisTestsCourseId, newAccumWeightForThisCourseId);
    }
    for (const [course_id, accumWeight] of map) if (accumWeight !== 100) return false;
    return true;
  }
}
