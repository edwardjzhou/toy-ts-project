/** 
 * “node app.js courses.csv students.csv tests.csv marks.csv output.json”
 * for the principal's use, we assumed:
 * 1. small and static data (in-memory with index-to-row maps for each csv file)
 * 2. valid command line args 
 * 3. tractable csv files (we don't use a parser; idealized input; no regex)
 * tsc src/* --outDir dist --allowJs
 * node '/Users/edward/Desktop/hatchways_fullstack/dist/app.js' courses.csv students.csv tests.csv marks.csv output.json
*/
// import { StudentController } from './models/Student'
// import { CsvTableParser } from './parser/Parser'

import { Student } from './models/Student';
import { Course } from './models/Course';
import { Mark } from './models/Mark';
import { Test } from './models/Test';



class App {  
    migrate(){ 
        if (process.argv.length < 7) throw Error('need (course, student, test, mark, and output) args');
        const coursesFilePath = process.argv[2],
        studentsFilePath = process.argv[3],
        testsFilePath = process.argv[4],
        marksFilePath = process.argv[5],
        outputFilePath = process.argv[6];

        const models = [Student, Course, Mark, Test];
        console.log(Student.prototype.id)

        // Promise.all(pkedModels).then(
        //     console.log
        // )
    }

    join(){
    }
    
    validate(){}

}

new App().migrate()

    // let result;
    // const areTestWeightsValid = Test.validateTestWeights(this.tests);
    // console.log(Student, this.students)
    // return

    // if (areTestWeightsValid === false) {
    //   result = {
    //     "error": "Invalid course weights"
    //   };
    // } else {
    //   this.students.sort(student => student.id)

    // }
    
    // result = JSON.stringify(result, null, 2)
    // fs.writeFile('output1.json', result, err => {
    //   if (err) throw err
    // })
    // console.log(1123,this)
//   }

// }