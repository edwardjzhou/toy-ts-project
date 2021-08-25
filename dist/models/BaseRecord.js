"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPrimaryKey = exports.withoutPrimaryKey = void 0;
const events_1 = require("events");
const Parser_1 = require("./../parser/Parser");
const withoutPrimaryKey = () => {
    return class {
        static index = [];
        static get all() {
            return this.index;
        }
        static set all(records) {
            this.index = records;
        }
        static async import(fp) {
            const { headers, records } = await new Parser_1.CsvTableParser(this).run(fp);
            this.all = records;
        }
    };
};
exports.withoutPrimaryKey = withoutPrimaryKey;
const PK_MODEL_DONE_IMPORTING = Symbol('@@DONE');
// withPrimaryKey is a factory for static methods that records extend/mix
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
        static async import(fp) {
            if (this.isLoaded)
                return void 0;
            const { headers, records } = await new Parser_1.CsvTableParser(this).run(fp);
            this.all = records;
            this.isLoaded = true;
            this.isLoadedEvent.emit(PK_MODEL_DONE_IMPORTING);
        }
        static isLoadedEvent = new events_1.EventEmitter().setMaxListeners(1e3);
        static isLoaded = false;
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
        static find(id) {
            switch (this.index.has(id)) {
                case true: return Promise.resolve(this.index.get(id));
                case false:
                    switch (this.isLoaded) {
                        case true: throw Error('relational consistency violated; some FK doesnt map to a record');
                        case false: return new Promise((resolve) => {
                            this.isLoadedEvent.once(PK_MODEL_DONE_IMPORTING, () => {
                                resolve(this.index.get(id));
                            });
                        });
                    }
            }
        }
    };
};
exports.withPrimaryKey = withPrimaryKey;
exports.default = { withoutPrimaryKey: exports.withoutPrimaryKey, withPrimaryKey: exports.withPrimaryKey };
