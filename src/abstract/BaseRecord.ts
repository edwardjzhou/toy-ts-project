import { CsvTableParser } from '../Parsing/Parser'
import type { CsvFilePath } from '../Parsing/Parser'

import { Model, Record, Schema } from 'models/schema';
import type { PrimaryKey, ForeignKey,  } from '../models/types'


// a model class like Student extends UseForeignKeyedStatics() which creates a new class that extends abstract BaseRecord
// these static classes are an interface between the datastore of a csv file and Model objects.
abstract class BaseRecord {
    public static LiterallyAllRecords = {}
    public static index: Iterable<BaseRecord>; // overridden
    public static get all(): BaseRecord[] | undefined {return void 0}; // overridden
    public static set all(args: BaseRecord[] | undefined){}; // overridden

    public static async load(this: Model & typeof BaseRecord, fp: CsvFilePath = `/../${this.name.toLowerCase()}s.csv`): Promise<void>{
      if (this.isLoaded === true) return Promise.resolve(void 0)
      return await new CsvTableParser(this).run(fp).then( ({headers, records}) => {
        // console.log(headers, records)
        this.all = records
        this.isLoaded = true; 
      })
    }
    public static isLoaded: boolean = false;
    // public save(this:): any{
      // validations here 
      // save to index
    // }
}

type ForeignKeyPropNameInSchema<T> = {
  [P in keyof T]: P extends `${string}_id` ? P : never
}[keyof T]

export const UseForeignKeyedStatics = () => class ForeignKeyedRecord extends BaseRecord {
  public static override index: ForeignKeyedRecord[] = [];
  public static override get all(): ForeignKeyedRecord[] {
    return this.index
  }

  // ex: takes a foreign key prop name like "student_id" and val like 1 to find a Mark
  public static find(prop: ForeignKeyPropNameInSchema<ForeignKeyedRecord>, value: ForeignKey): ForeignKeyedRecord | undefined {
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




export const UsePrimaryKeyedStatics = <T extends {id: PrimaryKey}> (): any => {
  return class PrimaryKeyedRecord extends BaseRecord {
    public static override index: Map<PrimaryKey, T> = new Map()
    public static override get all(): T[] {
      return [...this.index.values()]
    }
    public static override set all(records: T[]) {
      for (const record of records) {
        this.index.set(record.id, record)
      }
    }

    public static find(id: PrimaryKey): T | undefined {
      return this.index.get(id)
    }
    
    public id: PrimaryKey;
    protected constructor(id: PrimaryKey){
      super()
      this.id = id
    }
  }
}

export default {
    UsePrimaryKeyedStatics,
    UseForeignKeyedStatics
}

