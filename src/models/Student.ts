import type { MarkRecord } from './Mark';
import { withPrimaryKey } from './BaseRecord';
import type { PrimaryKey , ModelRecord} from './schema';
export interface StudentSchema {
  id: PrimaryKey;
  name: string;
}
interface StudentComputed {
  marks: MarkRecord[];    // a student has_many marks; join a student with Mark.student_id
  totalAverage: number;   // computed for view (rounded to 2 decimals)
}
export type StudentRecord = StudentSchema & StudentComputed;

export class Student extends withPrimaryKey<StudentRecord>() implements StudentRecord {
  // accessors to joins and computed values; dependent on other tables
  private _marks: MarkRecord[] = [];    // has-many
  private _totalAverage!: number;       // computed
  public get marks(): MarkRecord[] {
    return this._marks;
  }
  public set marks(marks: MarkRecord[]) {
    this._marks = marks;
  }
  public get totalAverage(): number {
    return this._totalAverage;
  }
  private set totalAverage(value: number) { // calculated in student controller right before view renders
    this._totalAverage = value;
  }
  // read from csv table
  public readonly id: PrimaryKey;
  public readonly name: string;
  public constructor(id: PrimaryKey, name: string){
    super();
    this.id = id |= 0;
    this.name = name;    
  }
}
export default Student 



