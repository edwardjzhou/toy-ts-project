import { CsvTableParser } from '../Parsing/Parser'
import type { CsvFilePath } from '../Parsing/Parser'

import type { PrimaryKey, ForeignKey } from '../models/types'
import { Model } from 'models/schema';

import { Student}  from 'models/Student';

// a model class like Student extends (ForeignKey,PrimaryKey)Record 
// these static classes are an interface between the datastore of a csv file an  object models 
abstract class BaseRecord {
    public static index: Iterable<BaseRecord>;
    public static get all(): BaseRecord[] | undefined {return void 0};
    public static set all(args: BaseRecord[] | undefined){}; 
    public static async load<T extends typeof BaseRecord>(this: T, fp: CsvFilePath = `/../${this.name.toLowerCase()}s.csv`): Promise<void>{
      return await new CsvTableParser(this).run(fp).then( ({headers, records}) => {
        console.log(headers, records)
        this.all = records
      })
    }
}

// export class PrimaryKeyedRecord extends BaseRecord {
//   public static override index: Map<PrimaryKey, PrimaryKeyedRecord> = new Map()
//   public static override get all(): PrimaryKeyedRecord[] {
//     return [...this.index.values()]
//   }
  
//   public static override set all(records: PrimaryKeyedRecord[]) {
//     for (const record of records) {
//       this.index.set(record.id, record)
//     }
//   }

//   public static find(id: PrimaryKey): PrimaryKeyedRecord | undefined {
//     return this.index.get(id)
//   }
  
//   public id: PrimaryKey
//   protected constructor(id: PrimaryKey){
//     super()
//     this.id = id
//   }
// }

type ForeignKeyPropName<T> = {
  [P in keyof T]: P extends `${string}_id` ? P : never
}[keyof T]

export abstract class ForeignKeyedRecord extends BaseRecord {
  public static override index: ForeignKeyedRecord[] = [];
  public static get all(): ForeignKeyedRecord[] {
    return this.index
  }
  public static isLoaded: boolean = false; 
  // ex: takes a foreign key prop name like "student_id" and val like 1 to find a Mark
  public static find(prop: ForeignKeyPropName<ForeignKeyedRecord>, value: ForeignKey): ForeignKeyedRecord | undefined {
    return this.index.find(record => record[prop] === value)
  }

  protected constructor(schemaValues: any){
    super()
    for (const [key, value] of Object.entries(schemaValues)){
      if (key.includes('_id')) {
        Object.defineProperty(this, key, { value } )
      }
    }
  }
}

// export const UseStatics = (Base: typeof PrimaryKeyedRecord | typeof ForeignKeyedRecord) => class Derived extends Base {}

export const UsePrimaryKeyedStatics = () => class DerivedRecord extends BaseRecord {
  public static override index: Map<PrimaryKey, DerivedRecord> = new Map()
  public static override get all(): DerivedRecord[] {
    return [...this.index.values()]
  }
  
  public static override set all(records: DerivedRecord[]) {
    for (const record of records) {
      this.index.set(record.id, record)
    }
  }

  public static find(id: PrimaryKey): DerivedRecord | undefined {
    return this.index.get(id)
  }
  
  public id: PrimaryKey
  protected constructor(id: PrimaryKey){
    super()
    this.id = id
  }
}

// type FreezablePlayer = Player & { shouldFreeze: boolean };
 
// const playerTwo = (new Player() as unknown) as FreezablePlayer;
// playerTwo.shouldFreeze;
export default {
    UsePrimaryKeyedStatics
}

