"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPrimaryKey = exports.withoutPrimaryKey = exports.BaseRecord = void 0;
const events_1 = __importDefault(require("events"));
const Parser_1 = require("./../parser/Parser");
class BaseRecord {
    static LiterallyAllRecords = new Map();
    static index; // overridden
    static get all() { return void 0; }
    ; // overridden
    static set all(args) { }
    ; // overridden
}
exports.BaseRecord = BaseRecord;
const withoutPrimaryKey = (Base) => {
    class WithoutPrimaryKeyStatics extends Base {
        static index = [];
        static get all() {
            return this.index;
        }
        static set all(records) {
            this.index = records;
        }
        static async load(fp = `/../${this.name.toLowerCase()}s.csv`) {
            if (this.isLoaded)
                return Promise.resolve(void 0);
            const { headers, records } = await new Parser_1.CsvTableParser(this).run(fp);
            this.all = records;
            this.isLoaded = true;
        }
        static isLoaded = false;
        static async find(prop, value) {
            return this.index.find(record => record[prop] === value);
        }
    }
    return WithoutPrimaryKeyStatics;
};
exports.withoutPrimaryKey = withoutPrimaryKey;
// HAS a primary key; could also have foreign keys
const MODEL_DONE_LOADING = Symbol('@@DONE');
const withPrimaryKey = () => {
    return class extends BaseRecord {
        static async load(fp = `../../${this.name.toLowerCase()}s.csv`) {
            if (this.isLoaded === true)
                return Promise.resolve(void 0);
            const { headers, records } = await new Parser_1.CsvTableParser(this).run(fp);
            this.all = records;
            super.LiterallyAllRecords.set(this, records);
            this.isLoaded = true;
            this.isLoadedEvent.emit(MODEL_DONE_LOADING);
        }
        static isLoadedEvent = new events_1.default.EventEmitter();
        static isLoaded = false;
        static index = new Map();
        static get all() {
            return [...this.index.values()];
        }
        static set all(records) {
            for (const record of records) {
                this.index.set(record.id, record);
            }
        }
        static async find(id) {
            switch (this.index.has(id)) {
                case true: return Promise.resolve(this.index.get(id));
                case false:
                    switch (this.isLoaded) {
                        case true: throw Error('relational consistency violated');
                        case false: return new Promise(resolve => {
                            this.isLoadedEvent.once(MODEL_DONE_LOADING, () => resolve(this.find(id)));
                        });
                    }
            }
        }
    };
};
exports.withPrimaryKey = withPrimaryKey;
exports.default = { BaseRecord, withoutPrimaryKey: exports.withoutPrimaryKey, withPrimaryKey: exports.withPrimaryKey };
// type Minutes = Distinct<number, "Minutes">;
// type Seconds = Distinct<number, "Seconds">;
// function validateHours(x: number): Hours | undefined {
//   if (x >= 0 && x <= 23) return x as Hours;
// }
// function validateMinutes(x: number): Minutes | undefined {
//   if (x >= 0 && x <= 59) return x as Minutes;
// }
// function validateSeconds(x: number): Seconds | undefined {
//   if (x >= 0 && x <= 59) return x as Seconds;
// }
