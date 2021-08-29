"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const Course_1 = require("./../models/Course");
const Mark_1 = require("./../models/Mark");
const Test_1 = require("./../models/Test");
const Student_1 = require("./../models/Student");
const StudentsController_1 = require("./StudentsController");
const Parser_1 = require("./../parser/Parser");
const final_1 = __importDefault(require("./../parser/decorators/final"));
const studentsController = new StudentsController_1.StudentsController();
class App {
  #result;
  outputFilePath;
  static singleton = new App();
  static getSingleton = () => this.singleton;
  constructor() {}
  run() {
    this.migrate().then(() => this.render());
  }
  migrate() {
    if (process.argv.length < 7)
      throw Error("need course, student, test, mark, and output args");
    const coursesFilePath = process.argv[2],
      studentsFilePath = process.argv[3],
      testsFilePath = process.argv[4],
      marksFilePath = process.argv[5];
    this.outputFilePath = Parser_1.JSONPath(process.argv[6]); // throws if not '*.json' string
    const paths = [
      coursesFilePath,
      studentsFilePath,
      testsFilePath,
      marksFilePath,
    ].filter(Parser_1.isCsvFilePathOrThrow); // can throw
    const models = [
      Course_1.Course,
      Student_1.Student,
      Test_1.Test,
      Mark_1.Mark,
    ];
    const allModelImports = models.map((model, i) => model.import(paths[i]));
    return Promise.all(allModelImports);
  }
  render() {
    if (!Course_1.Course.areTestWeightsValid()) {
      this.#result = {
        error: "Invalid course weights",
      };
    } else {
      const students = studentsController.index();
      this.#result = {
        students,
      };
    }
    // console.log(Student.all, Mark.all, Test.all, Course.all);
    // console.log(JSON.stringify(this.#result, null, 2))
    fs_1.default.writeFile(
      this.outputFilePath,
      JSON.stringify(this.#result, null, 2),
      (err) => {
        if (err) throw err;
      }
    );
  }
}
__decorate([final_1.default], App.prototype, "outputFilePath", void 0);
exports.default = App.getSingleton();
