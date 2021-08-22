/** 
 * “node app.js courses.csv students.csv tests.csv marks.csv output.json”
 * for the principal's use, we assumed:
 * 1. small and static data (in-memory with index-to-row maps for each csv file)
 * 2. valid command line args 
 * 3. tractable csv files (we don't use a parser; idealized input; no regex)
 * tsc src/* --outDir dist --allowJs
 * ts-node '/Users/edward/Desktop/hatchways_fullstack/src/app' courses.csv students.csv tests.csv marks.csv output.json
*/

import fs from 'fs';
import { Course } from './models/Course';
import { Mark } from './models/Mark';
import { Test } from './models/Test';
import { Student } from './models/Student';


class App {  
    #result: unknown = null; 
    public run (){
        this.start()
        this.migrate();
        this.render();
    }

    protected migrate(){ 
        this.loadCsvRecords();
        this.joinRecords();
    }
    private loadCsvRecords(){
         if (process.argv.length < 7) throw Error('need (course, student, test, mark, and output) args');
        const coursesFilePath = process.argv[2],
        studentsFilePath = process.argv[3],
        testsFilePath = process.argv[4],
        marksFilePath = process.argv[5],
        outputFilePath = process.argv[6];
        const paths = [coursesFilePath, studentsFilePath, testsFilePath, marksFilePath]
        const models = [Course, Student, Test, Mark];
        const allLoads = models.map((model, i) => model.load(paths[i] as any))
        // Promise.all(allLoads).then( ()=>
        //     console.log(Course.all, Student.all, Test.all, Mark.all)
        // )
        setTimeout(()=>{
            console.log(Course.all, Student.all, Test.all, Mark.all)
        },2000)
    }
    private joinRecords(): any{
    }


    protected render(): void{
        if (!Course.areTestWeightsValid()) {
            this.#result = {
                "error": "Invalid course weights"
            };
        } else {
            Student.all.sort( (a,b) => a.id > b.id ? 1: (a.id < b.id ? -1: 0) )
            this.#result = JSON.stringify(result, null, 2)
            fs.writeFile('output1.json', result, err => {
              if (err) throw err
            })
        }
    }

}

const principalsApp = new App().run()

