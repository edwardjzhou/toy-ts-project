// “node app.js courses.csv students.csv tests.csv marks.csv output.json”
// for the principal's use, we assumed:
// 1. small and static data (in-memory with index-to-row maps for each csv file)
// 2. valid command line args 
// 3. tractable csv files (we don't use a parser; idealized input; no regex)
// tsc src/* --outDir dist --allowJs
// node '/Users/edward/Desktop/hatchways_fullstack/dist/app.js' courses.csv students.csv tests.csv marks.csv output.json
// const fs = require('fs');
// const Table    = require('./Table'),
//       Course   = require('./Course'),
//       Student  = require('./Student'),
//       Test     = require('./Test'),
//       Mark     = require('./Mark');
// class App {  
//   loadTables(){
//     const coursesFilePath = process.argv[2],
//     studentsFilePath = process.argv[3],
//     testsFilePath = process.argv[4],
//     marksFilePath = process.argv[5],
//     outputFilePath = process.argv[6];
//     const tableDescriptions = [
//       [coursesFilePath, Course],
//       [studentsFilePath, Student],
//       [testsFilePath, Test],
//       [marksFilePath, Mark]
//     ];
//     return Promise.all(
//       tableDescriptions.map(([path, OrmClass]) => {
//         return new Table(path, OrmClass)
//       })
//     )
//   }
//   outputJson(){
//     let result;
//     const areTestWeightsValid = Test.validateTestWeights(this.tests);
//     console.log(Student, this.students)
//     return
//     if (areTestWeightsValid === false) {
//       result = {
//         "error": "Invalid course weights"
//       };
//     } else {
//       this.students.sort(student => student.id)
//     }
//     result = JSON.stringify(result, null, 2)
//     fs.writeFile('output1.json', result, err => {
//       if (err) throw err
//     })
//     console.log(1123,this)
//   }
// }
// const principalsApp = new App()
//     this.load()
//     .then(() => {
//       // this.outputJson();
//     })
//     .catch(err => {
//       throw err;
//     });
