"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPrimaryKey = exports.withoutPrimaryKey = void 0;
const events_1 = require("events");
const Parser_1 = require("./../parser/Parser");
const measure_1 = __importDefault(require("./../parser/decorators/measure"));
const final_1 = __importDefault(require("./../parser/decorators/final"));
class BaseRecord {
    static all;
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
        this.all = records;
    }
}
__decorate([
    final_1.default
], BaseRecord, "all", void 0);
__decorate([
    measure_1.default
], BaseRecord, "import", null);
const withoutPrimaryKey = () => {
    return class extends BaseRecord {
        static index = [];
        static get all() {
            return this.index;
        }
        static set all(records) {
            if (Array.isArray(records))
                this.index = records;
            else
                this.index.push(records);
        }
    };
};
exports.withoutPrimaryKey = withoutPrimaryKey;
const PK_MODEL_DONE_IMPORTING = Symbol('@@DONE');
// withPrimaryKey is a factory for utility classes that each Model inherits 
const withPrimaryKey = () => {
    return class extends BaseRecord {
        static index = new Map();
        static get all() {
            return [...this.index.values()];
        }
        static set all(records) {
            for (const record of records) {
                this.index.set(record.id, record);
            }
        }
        /**
        * (anonymous class).import handles importing from csv
        * app.migrate calls this.import on a Model class
        * @see {CsvTableParser.create} (2). import creates a line-reader from CsvTableParser.create
        * (3). The line-reader makes model instances who try to @see {find} associations
        * (4). The model sets @see {all} and @see {isLoadedEvent} emits when line-reader finishes
        * (5). The model is ready for app controllers and helps resolve app.migrate
        */
        static async import(fp) {
            if (this.isLoaded)
                return void 0;
            await super.import(fp);
            this.isLoaded = true;
            this.isLoadedEvent.emit(PK_MODEL_DONE_IMPORTING);
        }
        static isLoadedEvent = new events_1.EventEmitter().setMaxListeners(1e3);
        static isLoaded = false;
        /**
         *  @see {find} (anonymous class).find
         *  we wanted:  a. ordered resolution b. not having to pass a cb param
         *  for (a) we have to use events
         *  for (b) we have to use promises
         *  So we chose to return a promise that is resolved by a listener invocation,
         *  rather than by another promise (which would result, in our case, in an undesired order of resolution)
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
