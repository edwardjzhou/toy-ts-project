import { EventEmitter, once } from 'events'
import { CsvTableParser } from './../parser/Parser'
import type { CsvFilePath } from './../parser/Parser'
import type { 
  PrimaryKey, ForeignKey,
  Model, Record, 
  Schema, ForeignKeyPropNamesInSchema,
  NotPrimaryKeyedSchema, PKSchema
} from './schema';
declare module 'node:events'
export abstract class BaseRecord {
    public static LiterallyAllRecords: Map<Model, Record> = new Map()
    public static index: Iterable<any>; // overridden
    public static get all(): any {return void 0}; // overridden
    public static set all(args: any){}; // overridden
}

export const withoutPrimaryKey = <T extends NotPrimaryKeyedSchema>() => {
  return class extends BaseRecord {
    public static override index: T[] = [];
    public static override get all(): T[] {
      return this.index;
    }
    public static override set all(records: T[]) {
      this.index = records;
    }
    public static async load(fp: CsvFilePath = `/../${this.name.toLowerCase()}s.csv`): Promise<void>{
      if (this.isLoaded) return Promise.resolve(void 0);
      const { headers, records } = await new CsvTableParser(<any>this).run(fp);
      this.all = records;
      this.isLoaded = true; 
    }
    public static isLoaded: boolean = false;
    public static async find<
      FKName extends ForeignKeyPropNamesInSchema<T>,
      FKValue extends T[FKName]
    > (prop: FKName, value: FKValue): Promise<T | undefined> {
      return this.index.find(record => record[prop] === value)
    }
  }
}

const MODEL_DONE_LOADING: unique symbol = Symbol('@@DONE');
export const withPrimaryKey = <T extends PKSchema> () => {
  return class extends BaseRecord{
    public static async load(fp: CsvFilePath = `../../${this.name.toLowerCase()}s.csv`): Promise<void>{
      if (this.isLoaded) return Promise.resolve(void 0)
      const { headers, records } = await new CsvTableParser(<any>this).run(fp);
      this.all = records;
      super.LiterallyAllRecords.set(<any>this, <any>records)
      this.isLoaded = true; 
      this.isLoadedEvent.emit(MODEL_DONE_LOADING)
    }
    public static isLoadedEvent: EventEmitter = new EventEmitter();
    public static isLoaded: boolean = false;
    public static override index: Map<PrimaryKey, T> = new Map<PrimaryKey, T>()
    public static override get all(): T[] {
      return [...this.index.values()]
    }
    public static override set all(records: T[]) {
      for (const record of records) {
        this.index.set(record.id, record)
      }
    }
    public static find(id: PrimaryKey): Promise<T> | never {
      switch(this.index.has(id)) {
        case true: return Promise.resolve(<T>this.index.get(id))
        case false: 
          switch(this.isLoaded) {
            case true: throw Error('relational consistency violated');
            case false: return new Promise( (resolve): void => {
                this.isLoadedEvent.once(MODEL_DONE_LOADING, () => {
                  resolve(<T>this.index.get(id));
                })
            })
          }
      }
    }
  }
}
export default { BaseRecord, withoutPrimaryKey, withPrimaryKey }
