import { Test } from './Test';
import { UsePrimaryKeyedStatics } from '../abstract/BaseRecord';
import type { PrimaryKey } from "./types";

export interface CourseSchema {
  id: PrimaryKey;
  name: string;
  teacher: string;
}
interface CourseComputed {
    tests: Test[];          // has_many tests
    totalWeight: number;    // computed for validation Course.tests
}
type CourseRecord = CourseSchema & CourseComputed;

export class Course extends UsePrimaryKeyedStatics() implements CourseRecord {
  public id: PrimaryKey;
  public name: string;
  public teacher: string; 

  private _tests!: Test[];
  private _totalWeight!: number;
  public get tests(): Test[] {
    return this._tests;
  }
  public set tests(value: Test[]) {
    this._tests = value;
  }
  public get totalWeight(): number {
    return this._totalWeight;
  }
  public set totalWeight(value: number) {
    this._totalWeight = value;
  }

  constructor(id: PrimaryKey, name: string, teacher: string) {
    super(id);
    this.id = Number(id);
    this.name = name;
    this.teacher = teacher;
  }

  // validates that the weights of all tests of a course add to exactly 100
  // static validateWeights(){
  //   const map = new Map(); // maps a course to all of its tests' cumulative weight
  //   for (const test of [...Test.indexToRowMap.values()]) {
  //     const thisTestsCourseId = test.course_id;
  //     const thisTestsWeight = test.weight;
  //     const oldAccumWeightForThisCourseId = map.get(thisTestsCourseId) ?? 0;
  //     const newAccumWeightForThisCourseId = oldAccumWeightForThisCourseId + thisTestsWeight;
  //     map.set(thisTestsCourseId, newAccumWeightForThisCourseId);
  //   }
  //   for (const [course_id, accumWeight] of map) if (accumWeight !== 100) return false;
  //   return true;
  // }

}

export default {
  Course
}

