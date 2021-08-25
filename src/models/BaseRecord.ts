import { EventEmitter, once } from 'events'
import { CsvTableParser } from './../parser/Parser'
import type { CsvFilePath } from './../parser/Parser'
import type { 
  PrimaryKey,
  Model, Record, ModelRecord,
  NoPKRecord, PKedRecord
} from './schema';
declare module 'node:events'

export const withoutPrimaryKey = <T extends NoPKRecord>() => {
  return class {
    public static index: T[] = [];
    public static get all(): T[] {
      return this.index;
    }
    public static set all(records: T[]) {
      this.index = records;
    }
    public static async import(fp: CsvFilePath): Promise<void>{
      const { headers, records } = await new CsvTableParser().run(fp);
      const res = []
      for (const record of records) {
        // @ts-ignore
        res.push(new this(...record.split(',')) )
      }
      this.all = <T[]>res;

    }
  }
}





const PK_MODEL_DONE_IMPORTING: unique symbol = Symbol('@@DONE');
// withPrimaryKey is a factory for copies of anonymous static classes that each Model inherits 
export const withPrimaryKey = <T extends PKedRecord> () => {
  return class {
    public static index: Map<PrimaryKey, any> = new Map<PrimaryKey, any>()
    public static get all(): T[] {
      return [...this.index.values()]
    }
    public static set all(records: T[]) {
      for (const record of records) {
        this.index.set(record.id, record)
      }
    }

    // (anonymous class).import handles importing from csv
    // (a). app.migrate calls model.import
    // (b). model.import creates a parser instance per import
    // (c). The parser makes model instances and the model sets all 
    // (d). Declares this model is ready for controller/app views by resolving app.migrate
    public static async import(fp: CsvFilePath): Promise<void>{
      if (this.isLoaded) return void 0;
      const { headers, records } = await new CsvTableParser().run(fp);
      const res = []
      for (const record of records) {
        // @ts-ignore
        res.push(new this(...record.split(',')) )
      }
      this.all = <T[]>res;
      this.isLoaded = true; 
      this.isLoadedEvent.emit(PK_MODEL_DONE_IMPORTING);
    }
    public static isLoadedEvent: EventEmitter = new EventEmitter().setMaxListeners(1e3);
    public static isLoaded: boolean = false;

    /**
     *  (anonymous class).find is an async function in disguise
     *  We want:
     *  1. ordered resolution 2. no passing a cb
     *  for (1) we have to use events
     *  for (2) we have to use promises
     *  So we chose to return a promise that is resolved by a listener invocation,
     *  rather than by another promise (which would result in unordered resolutions)
     *  For a model m of models M, m's isLoadedEvent's cb
     *  resolves all associative m.find() promises
     *  before the m.import() promise resolves, 
     *  and thus all records are whole before Promise.all(for m in M m.import()) resolves.
     * @static
     * @param id
     * @returns {(Promise<T> | never)}
     */
    public static async find(id: PrimaryKey): Promise<T> | never {
      switch(this.index.has(id)) {
        case true: return this.index.get(id);
        case false: 
          switch(this.isLoaded) {
            case true: throw Error('relational consistency violated; some FK doesnt map to a record');
            case false: return await new Promise(resolve => {
              this.isLoadedEvent.on(PK_MODEL_DONE_IMPORTING, () => resolve(this.index.get(id)) )
            })
          }
      }
    }
    }
}
export default { withoutPrimaryKey, withPrimaryKey }



