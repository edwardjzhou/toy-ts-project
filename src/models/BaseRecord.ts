import { EventEmitter, once } from 'events'
import { CsvTableParser } from './../parser/Parser'
import type { CsvFilePath } from './../parser/Parser'
import type { 
  PrimaryKey, ForeignKey,
  Model, Record, 
  Schema, ForeignKeyPropNamesInSchema,
  NotPrimaryKeyedSchema, PKSchema
} from './schema';

type AbstractConstructor<T> = abstract new (...args: any[]) => T
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
            case false: return new Promise(resolve => {
                this.isLoadedEvent.once(MODEL_DONE_LOADING, ()=> {
                  resolve(<T>this.index.get(id))
                })
              })
          }
      }
    }
  }
}
export default { BaseRecord, withoutPrimaryKey, withPrimaryKey }



// beginning AppController.update
// beginning App.migrate prom
// beginning App.loadCsvRecords prom
// beginning BaseRecord.load()
// beginning CsvTableParser.run()
// Execution time: 0.5390030145645142 milliseconds
// beginning BaseRecord.load()
// beginning CsvTableParser.run()
// Execution time: 0.08069100975990295 milliseconds
// beginning BaseRecord.load()
// beginning CsvTableParser.run()
// Execution time: 0.04825401306152344 milliseconds
// beginning CsvTableParser.run()
// Execution time: 0.06082901358604431 milliseconds
// before promise.all(BaseRecord.loads)
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// about to resolve CsvTableParser.run() with records/headers
// emitting/finishing BaseRecord.load() 
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// about to resolve CsvTableParser.run() with records/headers
// (node:70117) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 Symbol(@@DONE) listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
// (Use `node --trace-warnings ...` to show where the warning was created)
// (node:70117) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 Symbol(@@DONE) listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// about to resolve CsvTableParser.run() with records/headers
// emitting/finishing BaseRecord.load() 
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// about to resolve CsvTableParser.run() with records/headers
// emitting/finishing BaseRecord.load() 
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// LOAD CSV RECORDS RETURNING
// in THEN of App.update 


// beginning AppController.update
// beginning App.migrate prom
// beginning App.loadCsvRecords prom
// beginning BaseRecord.load()
// beginning CsvTableParser.run()
// Execution time: 0.6544070243835449 milliseconds
// beginning BaseRecord.load()
// beginning CsvTableParser.run()
// Execution time: 0.0729759931564331 milliseconds
// beginning BaseRecord.load()
// beginning CsvTableParser.run()
// Execution time: 0.053044021129608154 milliseconds
// beginning CsvTableParser.run()
// Execution time: 0.05990898609161377 milliseconds
// before promise.all(BaseRecord.loads)
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// about to resolve CsvTableParser.run() with records/headers
// emitting/finishing BaseRecord.load() 
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// CREATED ASSOC PROM
// created a model instance from parsing
// about to resolve CsvTableParser.run() with records/headers
// (node:70217) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 Symbol(@@DONE) listeners added to [EventEmitter]. Use emitter.setMaxListeners() to increase limit
// (Use `node --trace-warnings ...` to show where the warning was created)
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// IN THEN OF  ASSOC PROM
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// about to resolve CsvTableParser.run() with records/headers
// emitting/finishing BaseRecord.load() 
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// created a model instance from parsing
// about to resolve CsvTableParser.run() with records/headers
// emitting/finishing BaseRecord.load() 
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// resolved ASSOC PROM
// LOAD CSV RECORDS RETURNING
// in THEN of App.update 

// new Promise(resolve => 
//         process.nextTick(()=>resolve(2))
// ).then(console.log)

// Promise.resolve(1).then( (val)=>{
//     Promise.resolve(3).then(console.log)
//     console.log(val)
// }).then(()=>console.log(4))


// 1 -> 2
// const events = require('events')
// const e = new events.EventEmitter()
// Promise.resolve().then( ()=>{
//     new Promise(res=> {
//         e.on('agg', ()=>{
//             res(1)
//         })
//     }).then(console.log)
//     e.emit('agg')

// }).then(()=>{
//     console.log(2)
// })
// // 2 -> 1
// Promise.resolve().then( ()=>{
//     new Promise(res=> {
//         e.on('agg', ()=>{
//             res(1)
//         })
//     }).then(console.log)
//     e.emit('agg')

// }).then(()=>{
//     console.log(2)
// })

// let { EventEmitter } = require('events')
// let ee = new EventEmitter()
// async function  asdf(){
//     let a = new Promise(res=>{


//         setTimeout(()=>{
//                 res(null)
//             }
//         ,0)
//         setTimeout(() =>
//             {
//                 a.then(()=>console.log(1))
//             }
//         ,0)
//     })

//     Promise.all([a]).then(()=>console.log(2))
// }
// asdf()
// // gives 2->1 if res is first, 2->2 if a.then() is first

// 1. the only WAIT before APP RENDER is on ALL PARSERS': Parser.load() resolving
      // 2. that await parser promise calls as THEN the rest of withPrimaryKey().constructor.load() 
      // 3. parsers created naked models that call this.find() to create promises thened on event emit resolving the parse
      // TIMELINE ex:
      // 1. parser promise created
      // 2. the parser creates a new mark instance 
      // 3. the mark tries to join its student association via Student.find(mark.student_id) but has to wait
      // for the parser promise to fire an EMIT that will resolve it for it be put on microtask finish queue for its then() to fire.
      // 4. That parse promise finishes; in process.nextTick it will fire event for mark's promise to resolve
      // 5. But as soon as all students are parsed we return to full synchronous after a brand render wihthout that mark firing its then func
      // GUARANTEES with synchronous emit:
      // 1. by the time all parse promises resolve, ALL join/association/compute promises have been created 
      // 2. thus, the emit that synchronously resolves ALL assoc promises GUARANTEES that
      // 3. they are resolved before
      // 3. the promise wrapping from AppController.update().then(..) will call its then() which will go on to render, etc.