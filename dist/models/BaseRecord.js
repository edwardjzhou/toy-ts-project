"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPrimaryKey = exports.withoutPrimaryKey = void 0;
const events_1 = require("events");
const Parser_1 = require("./../parser/Parser");
class BaseRecord {
    static async import(fp) {
        const reader = Parser_1.CsvTableParser.create(fp);
        const records = [];
        let count = 0;
        for await (const row of reader) {
            if (count++ === 0)
                continue;
            // @ts-ignore
            records.push(new this(...row.split(',')));
        }
    }
}
const withoutPrimaryKey = () => {
    return class extends BaseRecord {
        static index = [];
        static get all() {
            return this.index;
        }
        static set all(records) {
            this.index = records;
        }
        static async import(fp) {
            const reader = Parser_1.CsvTableParser.create(fp);
            const headersArray = [];
            const records = [];
            let count = 0;
            for await (const row of reader) {
                if (count++ === 0)
                    headersArray.push(row);
                else
                    records.push(row);
            }
            const res = [];
            for (const record of records) {
                // @ts-ignore
                res.push(new this(...record.split(',')));
            }
            this.all = res;
        }
    };
};
exports.withoutPrimaryKey = withoutPrimaryKey;
const PK_MODEL_DONE_IMPORTING = Symbol('@@DONE');
// withPrimaryKey is a factory for utility classes that each Model inherits 
const withPrimaryKey = () => {
    return class {
        static index = new Map();
        static get all() {
            return [...this.index.values()];
        }
        static set all(records) {
            for (const record of records) {
                this.index.set(record.id, record);
            }
        }
        // (anonymous class).import handles importing from csv
        // (a). app.migrate calls model.import
        // (b). model.import creates a parser instance per import
        // (c). The parser makes model instances and the model sets all 
        // (d). Declares this model is ready for controller/app views by resolving app.migrate
        static async import(fp) {
            if (this.isLoaded)
                return void 0;
            const reader = Parser_1.CsvTableParser.create(fp);
            const records = [];
            let count = 0;
            for await (const row of reader) {
                if (count++ === 0)
                    continue;
                // @ts-ignore
                records.push(new this(...row.split(',')));
            }
            this.all = records;
            this.isLoaded = true;
            this.isLoadedEvent.emit(PK_MODEL_DONE_IMPORTING);
        }
        static isLoadedEvent = new events_1.EventEmitter().setMaxListeners(1e3);
        static isLoaded = false;
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
        static async find(id) {
            switch (this.index.has(id)) {
                case true: return this.index.get(id);
                case false:
                    switch (this.isLoaded) {
                        case true: throw Error('relational consistency violated; some FK doesnt map to a record');
                        case false: return await new Promise(resolve => {
                            this.isLoadedEvent.on(PK_MODEL_DONE_IMPORTING, () => resolve(this.index.get(id)));
                        });
                    }
            }
        }
    };
};
exports.withPrimaryKey = withPrimaryKey;
exports.default = { withoutPrimaryKey: exports.withoutPrimaryKey, withPrimaryKey: exports.withPrimaryKey };
