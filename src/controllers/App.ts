import fs from 'fs';
import { Course } from '../models/Course';
import { Mark } from '../models/Mark';
import { Test } from '../models/Test';
import { Student } from '../models/Student';
import { StudentsController } from './StudentsController';
import type { StudentsIndex } from './StudentsController';
import { isCsvFilePathOrThrow, JSONPath } from '../parser/Parser';
import type { JsonFilePath } from '../parser/Parser';


const studentsController = new StudentsController();
class App {  
  #result!: { students: StudentsIndex } | { error: "Invalid course weights" }; 
  private outputFilePath!: JsonFilePath;

  public run(): void {
    this.migrate().then(() => this.render())
  }

  public migrate(): Promise<void[]> | never {
    if (process.argv.length < 7) throw Error('need course, student, test, mark, and output args');
    const coursesFilePath = process.argv[2],
    studentsFilePath = process.argv[3],
    testsFilePath = process.argv[4],
    marksFilePath = process.argv[5];
    this.outputFilePath = JSONPath(process.argv[6]); // throws if not '*.json' string
    const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath].filter(isCsvFilePathOrThrow); // can throw 
    const models = [Course, Student, Test, Mark];
    const allModelImports = models.map((model, i) => model.import(paths[i])); 
    return Promise.all(allModelImports); 
  }

  public render(): void {
    if (!Course.areTestWeightsValid()) {
      this.#result = {
          "error": "Invalid course weights"
      };
    } else {
      const students = studentsController.index();
      this.#result = {
        students
      };
    }
    // console.log(Student.all, Mark.all, Test.all, Course.all);
    console.log(JSON.stringify(this.#result, null, 2))
    fs.writeFile(this.outputFilePath, JSON.stringify(this.#result, null, 2), (err) => {
      if (err) throw err
    });
  }
    
}

export default new App();
