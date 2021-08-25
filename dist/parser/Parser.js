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
const readline_1 = __importDefault(require("readline"));
const measure_1 = require("./decorators/measure");
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
    static create(fp) {
        return readline_1.default.createInterface({
            input: fs_1.default.createReadStream(fp),
            crlfDelay: Infinity
        });
    }
}
__decorate([
    measure_1.measure
], CsvTableParser, "create", null);
exports.CsvTableParser = CsvTableParser;
exports.default = { CsvTableParser };
