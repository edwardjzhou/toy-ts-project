import { EventEmitter, once } from 'events'
import { CsvTableParser } from './../parser/Parser'
import type { CsvFilePath } from './../parser/Parser'
import type { 
  PrimaryKey, NoPKRecord, PKedRecord
} from './schema';
import measure from './../parser/decorators/measure';
declare module 'node:events';

class BaseRecord {
  protected static all: any[];
  
  @measure
  public static async import(fp: CsvFilePath): Promise<void> {
    const reader = CsvTableParser.create(fp);
    const records = [];
    let count = 0;
    for await (const row of reader) {
      if (count++ === 0) continue;
      if (this.length === row.split(',').length) {
        // @ts-ignore
        records.push(new this(...row.split(',')));
      }
    }
    this.all = records;
  }
}

export const withoutPrimaryKey = <T extends NoPKRecord>() => {
  return class extends BaseRecord {
    private static index: T[] = [];
    public static override get all(): T[] {
      return this.index;
    }
    public static override set all(records: T[]) {
      if (Array.isArray(records)) this.index = records;
      else this.index.push(records);
    }
  }
}

const PK_MODEL_DONE_IMPORTING: unique symbol = Symbol('@@DONE');
// withPrimaryKey is a factory for utility classes that each Model inherits 
export const withPrimaryKey = <T extends PKedRecord> () => {
  return class extends BaseRecord {
    private static index: Map<PrimaryKey, T> = new Map<PrimaryKey, T>()
    public static override get all(): T[] {
      return [...this.index.values()];
    }
    private static override set all(records: T[]) {
      for (const record of records) {
        this.index.set(record.id, record);
      }
    }

    /** 
    * (anonymous class).import handles importing from csv 
    * (1). app.migrate calls model.import on every model
    * @see {CsvTableParser.create} (2). import creates a line-reader from CsvTableParser.create 
    * (3). The line-reader instantiates model instances who try to @see {find} associations
    * (4). The model sets @see {all} and emits @see {isLoadedEvent} when line-reader finishes
    * (5). The model is ready for app controllers
    */
    public static override async import(fp: CsvFilePath): Promise<void>{
      if (this.isLoaded) return void 0;
      await super.import(fp);
      this.isLoaded = true; 
      this.isLoadedEvent.emit(PK_MODEL_DONE_IMPORTING);
    }
    private static readonly isLoadedEvent: EventEmitter = new EventEmitter().setMaxListeners(1e3);
    private static isLoaded: boolean = false;

    /**
     *  (anonymous class).find 
     */
    public static async find(id: PrimaryKey): Promise<T> | never {
      switch(this.index.has(id)) {
        case true: return this.index.get(id)!;
        case false: 
          switch(this.isLoaded) {
            case true: throw Error('relational consistency violated; some FK doesnt map to a record');
            case false: {
              await once(this.isLoadedEvent, PK_MODEL_DONE_IMPORTING) 
              return this.index.get(id)!
            }
          }
      }
    }
  }
}
export default { withoutPrimaryKey, withPrimaryKey }


