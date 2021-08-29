"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.CsvTableParser = exports.isCsvFilePathOrThrow = exports.JSONPath = void 0;
const fs_1 = __importDefault(require("fs"));
const readline_1 = __importDefault(require("readline"));
const JSONPath = (path) => {
  if (path.slice(path.length - 5) !== ".json")
    throw TypeError("output arg must end in .json");
  return path;
};
exports.JSONPath = JSONPath;
const isCsvFilePathOrThrow = (path) => {
  if (path.slice(path.length - 4) !== ".csv")
    throw TypeError("args must end in .csv");
  return true;
};
exports.isCsvFilePathOrThrow = isCsvFilePathOrThrow;
class CsvTableParser {
  static create(fp) {
    return readline_1.default.createInterface({
      input: fs_1.default.createReadStream(fp),
      crlfDelay: Infinity,
    });
  }
}
exports.CsvTableParser = CsvTableParser;
exports.default = CsvTableParser;
