/** 
 * “node app.js courses.csv students.csv tests.csv marks.csv output.json”
 * for the principal's use, we assumed:
 * 1. small and static data (in-memory with index-to-row maps for each csv file)
 * 2. valid command line args 
 * 3. tractable csv files (we don't use a parser; idealized input; no regex)
 * tsc src/* --outDir dist --allowJs
 * node '/Users/edward/Desktop/hatchways_fullstack/dist/app.js' courses.csv students.csv tests.csv marks.csv output.json
*/
class App {  
  parse(){}
  validate(){}
  runController(){}
  outputToJson(){
    // let result;
    // const areTestWeightsValid = Test.validateTestWeights(this.tests);
    // console.log(Student, this.students)
    return

    if (areTestWeightsValid === false) {
      result = {
        "error": "Invalid course weights"
      };
    } else {
      this.students.sort(student => student.id)

    }
    
    result = JSON.stringify(result, null, 2)
    fs.writeFile('output1.json', result, err => {
      if (err) throw err
    })
    console.log(1123,this)
  }

}

// const principalsApp = new App().loadTables().then((results) => {
//       // this.outputJson();
//     })
//     .catch(err => {
//       console.warn(err.stack)
//       throw err;
//     });


//     /**
//  * To be called 70 to 80 days after {@link plantCarrot}.
//  */


// async function readAsyncIterable(dependentPromisesArray){
//   for await (const aPromiseResolution of dependentPromisesArray) {
//     console.log(aPromiseResolution)
//   }
// }