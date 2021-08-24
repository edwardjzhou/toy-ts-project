import { Test } from './Test';
import { withPrimaryKey } from './BaseRecord';
import type { PrimaryKey } from "./schema";
export interface CourseSchema {
  id: PrimaryKey;          
  name: string;
  teacher: string;
}
interface CourseComputed {
    tests: Test[];          // has_many tests
    totalWeight: number;    // computed for validation with Course.tests
}
export type CourseRecord = CourseSchema & CourseComputed;
export class Course extends withPrimaryKey<CourseRecord>() implements CourseRecord {
  private _tests: Test[] = [];        // has_many
  private _totalWeight!: number;      // computed for validating 
  public get tests(): Test[] {
    return this._tests;
  }
  public set tests(tests: Test[]) {
    this._tests = tests;
    // below: calculating totalWeight since it only depends on tests
    let cumWeight = 0; 
    for (const test of tests) cumWeight += test.weight;
    this.totalWeight = cumWeight;
  }
  public get totalWeight(): number {
    return this._totalWeight;
  }
  private set totalWeight(value: number) {
    this._totalWeight = value;
  }
  public id: PrimaryKey; 
  public name: string;
  public teacher: string; 
  public constructor(id: PrimaryKey, name: string, teacher: string) {
    super();
    this.id = Number(id);
    this.name = name;
    this.teacher = teacher;
  }
  // for every course, is sum(course.tests) = 100 
  static areTestWeightsValid(){
    for (const course of this.all) {
      if (course.totalWeight !== 100) return false;
    }
    return true;
  }
}
export default Course