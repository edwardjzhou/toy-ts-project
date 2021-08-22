import fs from 'fs';
import { Course } from './../models/Course';
import { Mark } from './../models/Mark';
import { Test } from './../models/Test';
import { Student } from './../models/Student';
import { StudentsController } from './StudentsController';
import MarksController from './MarksController';
import CoursesController from './CoursesController';

class App {  
    #result: unknown; 
    #studentsController = new StudentsController();
    #coursesController = new CoursesController();
    #marksController = new MarksController();

    public migrate(){ 
        this.loadCsvRecords();
        this.joinAndComputeRecords();
    }
    private async loadCsvRecords(){
         if (process.argv.length < 7) throw Error('need (course, student, test, mark, and output) args');
        const coursesFilePath = process.argv[2],
        studentsFilePath = process.argv[3],
        testsFilePath = process.argv[4],
        marksFilePath = process.argv[5],
        outputFilePath = process.argv[6];
        const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath];
        const models = [Course, Student, Test, Mark];
        const allLoads = models.map((model, i) => model.load(paths[i] as any));
        await Promise.all(allLoads);
    }
    private joinAndComputeRecords(): any{
    }

    public render(): void{
      if (!Course.areTestWeightsValid()) {
          this.#result = {
              "error": "Invalid course weights"
          };
      } else {
          const students = [];
          for (const student of this.#studentsController.index()) {
            const current = {
              ...this.#studentsController.show(student),
              courses: this.#coursesController.index(student)
            };
            students.push(current);
          }
          this.#result = {
            students
          };
      }
      this.#result = JSON.stringify(this.#result, null, 2);
      fs.writeFile('./../output1.json', <string>this.#result, err => {
        if (err) throw err
      });
    }

    constructor(){
      this.#studentsController = new StudentsController();
      this.#coursesController = new CoursesController();
      this.#marksController = new MarksController();
    }
}

class AppController {
  public create(): App {
    return new App();
  }
  public show(app: App){
    return app.render();
  }
  public update(app: App){
    return app.migrate();
  } 
}
export const AppControl = new AppController();