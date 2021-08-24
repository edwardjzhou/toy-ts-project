import fs from 'fs';
import { Course } from './../models/Course';
import { Mark } from './../models/Mark';
import { Test } from './../models/Test';
import { Student } from './../models/Student';
import { StudentsController } from './StudentsController';
import CoursesController from './CoursesController';
import { isCsvFilePathOrThrow, JSONPath } from '../parser/Parser';
import type { JsonFilePath } from '../parser/Parser';

const studentsController = new StudentsController();
const coursesController = new CoursesController();
class App {  
    #result!: { students: any[] } | { error: "Invalid course weights" }; 
    private outputFilePath!: JsonFilePath;

    public migrate(): Promise<this> { 
        return this.loadCsvRecords().then(() => this);
    }
    private loadCsvRecords(): Promise<void[]> {
        if (process.argv.length < 7) throw Error('need course, student, test, mark, and output args');
        const coursesFilePath = process.argv[2],
        studentsFilePath = process.argv[3],
        testsFilePath = process.argv[4],
        marksFilePath = process.argv[5];
        this.outputFilePath = JSONPath(process.argv[6]); // can throw
        const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath].filter(isCsvFilePathOrThrow); // can throw
        const models = [Course, Student, Test, Mark];
        const allLoads = models.map((model, i) => model.load(paths[i])); 
        return Promise.all(allLoads); 
    }

    public render(){
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
      if (process.env?.USER !== `edward`) console.log = () => {}
      console.log(Student.all, Mark.all, Test.all, Course.all);
      console.log(JSON.stringify(this.#result, null, 2))
      fs.writeFile(this.outputFilePath, JSON.stringify(this.#result, null, 2), (err) => {
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
