import { EventEmitter } from 'events'
import { CsvTableParser } from './../parser/Parser'
import type { CsvFilePath } from './../parser/Parser'
import type { 
  PrimaryKey, NoPKRecord, PKedRecord
} from './schema';
declare module 'node:events'

class BaseRecord {
  static all: any[]
  public static async import(fp: CsvFilePath): Promise<void> {
    const reader = CsvTableParser.create(fp);
    const records = []
    let count = 0
    for await (const row of reader) {
      if(count++ === 0) continue
      // @ts-ignore
      records.push(new this(...row.split(',')) )
    }
    this.all = records
  }
}

export const withoutPrimaryKey = <T extends NoPKRecord>() => {
  return class extends BaseRecord {
    public static index: T[] = [];
    public static get all(): T[] {
      return this.index;
    }
    public static set all(records: T[]) {
      this.index = records;
    }
  }
}

const PK_MODEL_DONE_IMPORTING: unique symbol = Symbol('@@DONE');

// withPrimaryKey is a factory for utility classes that each Model inherits 
export const withPrimaryKey = <T extends PKedRecord> () => {
  return class extends BaseRecord {
    public static index: Map<PrimaryKey, T> = new Map<PrimaryKey, T>()
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
    // (b). model.import creates a reader
    // (c). The parser makes model instances and the model sets all and emits done
    // (d). This model is ready for controller/app views and resolves app.migrate
    public static async import(fp: CsvFilePath): Promise<void>{
      if (this.isLoaded) return void 0;
      await super.import(fp)
      this.isLoaded = true; 
      this.isLoadedEvent.emit(PK_MODEL_DONE_IMPORTING);
    }
    public static isLoadedEvent: EventEmitter = new EventEmitter().setMaxListeners(1e3);
    public static isLoaded: boolean = false;

    /**
     *  (anonymous class).find 
     *  we wanted:  1. ordered resolution 2. no passing a cb
     *  for (1) we have to use events
     *  for (2) we have to use promises
     *  So we chose to return a promise that is resolved by a listener invocation,
     *  rather than by another promise (which would result, in in our case, in out of order resolution)
     */
    public static async find(id: PrimaryKey): Promise<T> | never {
      switch(this.index.has(id)) {
        case true: return this.index.get(id)!;
        case false: 
          switch(this.isLoaded) {
            case true: throw Error('relational consistency violated; some FK doesnt map to a record');
            case false: return await new Promise(resolve => {
              this.isLoadedEvent.on(PK_MODEL_DONE_IMPORTING, () => resolve(this.index.get(id)!) )
            })
          }
      }
    }
  }
}
export default { withoutPrimaryKey, withPrimaryKey }



