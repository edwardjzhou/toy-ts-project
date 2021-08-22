import { EventEmitter, once } from 'events'

import { Mark } from './Mark';
import { withPrimaryKey } from './BaseRecord';
import type { PrimaryKey } from './schema';
export interface StudentSchema {
  id: PrimaryKey;
  name: string;
}
interface StudentComputed {
  marks: Mark[];          // a student has_many marks; join a student with Mark.student_id
  totalAverage: number;   // computed for view (truncated to 2 decimals)
}
export type StudentRecord = StudentSchema & StudentComputed;
export class Student extends withPrimaryKey<StudentRecord>() implements StudentRecord {
  // accessors to joins and computed values; dependent on other tables
  private _marks: Mark[] = [];    // has-many
  private _totalAverage!: number; // computed
  public get marks(): Mark[] {
    return this._marks;
  }
  public set marks(value: Mark[]) {
    this._totalAverage = Math.round(this.marks.reduce((acc, mark) => acc + <number>mark.mark, 0) / this.marks.length);
    this._marks = value;
  }
  public get totalAverage(): number {
    return this._totalAverage;
  }
  private set totalAverage(value: number) {
    this._totalAverage = value;
  }
  // read from csv table
  public readonly id: PrimaryKey;
  public readonly name: string;
  public constructor(id: PrimaryKey, name: string){
    super();
    this.id = Number(id);
    this.name = name;    
  }
}
export default Student 