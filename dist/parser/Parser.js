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
exports.CsvTableParser = exports.isCsvFilePathOrThrow = exports.JSONPath = void 0;
const fs_1 = __importDefault(require("fs"));
const measure_1 = require("./decorators/measure");
const StringCleaning_1 = require("./modules/StringCleaning");
const JSONPath = (path) => {
    if (path.slice(path.length - 5) !== '.json')
        throw TypeError('output arg must end in .json');
    return path;
};
exports.JSONPath = JSONPath;
const isCsvFilePathOrThrow = (path) => {
    if (path.slice(path.length - 4) !== '.csv')
        throw TypeError('args must end in .csv');
    return true;
};
exports.isCsvFilePathOrThrow = isCsvFilePathOrThrow;
class CsvTableParser {
    model;
    constructor(model) {
        this.model = model;
    }
    run(filePath) {
        return new Promise(resolve => {
            fs_1.default.readFile(filePath, 'utf8', (err, rawData) => {
                if (err)
                    throw err;
                const [headersArray, rowStringsArray] = this.read(rawData);
                this.clean(rowStringsArray); // mutates rowStringsArray only
                this.transform(rowStringsArray); // mutates rowStringsArray only
                const result = { headers: headersArray, records: rowStringsArray };
                resolve(result);
            });
        });
    }
    read(rawData) {
        const headersArray = this.readHeaders(rawData);
        const rowStringsArray = this.readRows(rawData);
        return [headersArray, rowStringsArray];
    }
    readRows(rawData) {
        const splitByLine = rawData.split('\n');
        const rowStringsArray = splitByLine.slice(1);
        return rowStringsArray;
    }
    readHeaders(rawData) {
        const splitByLine = rawData.split('\n');
        const headersString = splitByLine[0];
        const headersArray = headersString.split(',');
        return headersArray;
    }
    clean(rowsStringsArray) {
        this.cleanRowStrings(rowsStringsArray);
    }
    cleanRowStrings(rowsStringsArray) {
        StringCleaning_1.StringCleaning.removeEmptyStringsFromStringArray(rowsStringsArray); // mutates
        StringCleaning_1.StringCleaning.removeSpacesAfterCommasFromStringArray(rowsStringsArray); // mutates
    }
    transform(rowsStringsArray) {
        this.transformRowStringsToModelObjects(rowsStringsArray);
    }
    transformRowStringsToModelObjects(rowsStringsArray) {
        for (const [idx, rowString] of Object.entries(rowsStringsArray)) {
            //@ts-ignore
            rowsStringsArray[idx] = new this.model(...rowString.split(','));
        }
    }
}
__decorate([
    measure_1.measure
], CsvTableParser.prototype, "run", null);
exports.CsvTableParser = CsvTableParser;
exports.default = { CsvTableParser };
