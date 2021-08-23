import fs from 'fs';
import { Course } from './../models/Course';
import { Mark } from './../models/Mark';
import { Test } from './../models/Test';
import { Student } from './../models/Student';
import { StudentsController } from './StudentsController';
import CoursesController from './CoursesController';
import { isCsvFilePathOrThrow, JSONPath } from '../parser/Parser';
import type { JsonFilePath } from '../parser/Parser';

class App {  
    readonly #studentsController = new StudentsController();
    readonly #coursesController = new CoursesController();
    #result!: { students?: any, error?: any } | string; 
    private outputFilePath!: JsonFilePath;

    public migrate(): Promise<this> { 
        return this.loadCsvRecords().then(() => this);
    }
    private loadCsvRecords(): Promise<void[]> {
        if (process.argv.length < 7) throw Error('need (course, student, test, mark, and output) args');
        const coursesFilePath = process.argv[2],
        studentsFilePath = process.argv[3],
        testsFilePath = process.argv[4],
        marksFilePath = process.argv[5];
        this.outputFilePath = JSONPath(process.argv[6]);
        const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath].filter(isCsvFilePathOrThrow);
        const models = [Course, Student, Test, Mark];
        const allLoads = models.map((model, i) => model.load(paths[i])); 
        return Promise.all(allLoads); 
    }

    public render(){
      console.log(Student.all, Mark.all, Test.all, Course.all);
      if (!Course.areTestWeightsValid()) {
          this.#result = {
              "error": "Invalid course weights"
          };
      } else {
          const students = [];
          for (const student of this.#studentsController.index()) {
            const courseAverages = [];
            const courses = this.#coursesController.index(student)
            for (const course of courses){
              courseAverages.push(course.courseAverage)
            }
            student.totalAverage = Math.round(courseAverages.reduce((acc, ele) => acc+ele) / courseAverages.length * 100) / 100
            const current = {
              ...this.#studentsController.show(student),
              courses:this.#coursesController.index(student)
            };
            students.push(current);
          }
          this.#result = {
            students
          };
      }
      this.#result = JSON.stringify(this.#result, null, 2);
      console.log(this.#result);
      fs.writeFile(this.outputFilePath, <string>this.#result, (err) => {
        if (err) throw err
      });
      return this.#result;
    
    }
}
class AppController {
  public create(): App {
    return new App();
  }
  public show(app: App){
    return app.render();
  }
  public update(app: App): Promise<App> {
    return app.migrate();
  } 
}
export const AppControllerSingleton = new AppController();
export const update = AppController.prototype.update; 
export const show = AppController.prototype.show;
export default { AppControllerSingleton, update, show } 