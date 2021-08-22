"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPrimaryKey = exports.withoutPrimaryKey = exports.BaseRecord = void 0;
const events_1 = require("events");
const Parser_1 = require("./../parser/Parser");
class BaseRecord {
    static get all() { return void 0; }
    ; // overridden
    static set all(args) { }
    ; // overridden
}
exports.BaseRecord = BaseRecord;
BaseRecord.LiterallyAllRecords = new Map();
const MODEL_DONE_LOADING = Symbol('@@DONE');
const withoutPrimaryKey = (Base) => {
    class WithoutPrimaryKeyStatics extends Base {
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
    }
    WithoutPrimaryKeyStatics.index = [];
    WithoutPrimaryKeyStatics.isLoaded = false;
    return WithoutPrimaryKeyStatics;
};
exports.withoutPrimaryKey = withoutPrimaryKey;
// HAS a primary key; could also have foreign keys
const withPrimaryKey = () => {
    var _a;
    return _a = class extends BaseRecord {
            static async load(fp = `../../${this.name.toLowerCase()}s.csv`) {
                if (this.isLoaded)
                    return Promise.resolve(void 0);
                const { headers, records } = await new Parser_1.CsvTableParser(this).run(fp);
                this.all = records;
                super.LiterallyAllRecords.set(this, records);
                this.isLoaded = true;
                process.nextTick(() => this.isLoadedEvent.emit(MODEL_DONE_LOADING));
            }
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
                    case true: return this.index.get(id);
                    case false:
                        switch (this.isLoaded) {
                            case true: throw Error('relational consistency violated');
                            case false: {
                                await events_1.once(this.isLoadedEvent, MODEL_DONE_LOADING);
                                return Promise.resolve(this.index.get(id));
                            }
                        }
                }
            }
        },
        _a.isLoadedEvent = new events_1.EventEmitter(),
        _a.isLoaded = false,
        _a.index = new Map(),
        _a;
};
exports.withPrimaryKey = withPrimaryKey;
exports.default = { BaseRecord, withoutPrimaryKey: exports.withoutPrimaryKey, withPrimaryKey: exports.withPrimaryKey };
