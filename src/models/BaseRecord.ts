import { EventEmitter } from 'events'
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
      const { headers, records } = await new CsvTableParser(<any>this).run(fp);
      this.all = records;
    }
  }
}

const PK_MODEL_DONE_IMPORTING: unique symbol = Symbol('@@DONE');
export const withPrimaryKey = <T extends PKedRecord> () => {
  return class ASDF{
    public static index: Map<PrimaryKey, T> = new Map<PrimaryKey, T>()
    public static get all(): T[] {
      return [...this.index.values()]
    }
    public static set all(records: T[]) {
      for (const record of records) {
        this.index.set(record.id, record)
      }
    }
    public static async import(fp: CsvFilePath): Promise<void>{
      if (this.isLoaded) return void 0;
      const { headers, records } = await new CsvTableParser(this).run(fp);
      this.all = records;
      this.isLoaded = true; 
      this.isLoadedEvent.emit(PK_MODEL_DONE_IMPORTING);
    }
    public static isLoadedEvent: EventEmitter = new EventEmitter().setMaxListeners(1e3);
    public static isLoaded: boolean = false;

    /**
     *  (anonymous class).find() is basically an async function.
     *  We write it this way since we need an ordered resolution of promises.
     *  For a model m of models M, m's isLoadedEvent's cb
     *  resolves all associative m.find() promises
     *  before the m.import() promise resolves, 
     *  and thus all records are whole before Promise.all(for m in M m.import()) resolves.
     * @static
     * @param id
     * @returns {(Promise<T> | never)}
     */
    public static find(id: PrimaryKey): Promise<T> | never {
          switch(this.index.has(id)) {
            case true: return Promise.resolve(<T>this.index.get(id));
            case false: 
              switch(this.isLoaded) {
                case true: throw Error('relational consistency violated; some FK doesnt map to a record');
                case false: return new Promise((resolve) => {
                    this.isLoadedEvent.once(PK_MODEL_DONE_IMPORTING, () => {
                      resolve(<T>this.index.get(id));
                    })
                });
              }
          }
        }
    }
}
export default { withoutPrimaryKey, withPrimaryKey }




