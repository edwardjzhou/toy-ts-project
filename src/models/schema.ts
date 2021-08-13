/**  
 * ### HARDCODED PARAMETERS FROM ASSIGNMENT ###
 */

// checks at runtime rather than statically

// function isModelClass(arg: any): arg is Model {
//     // return typeof arg.prototype.id === "number";
//     return 'constructor' in arg.prototype
// }


import fs from 'fs';
// import CsvTable from '../Parsing/CsvTable';
// import Course from './Course';
// import Student from './Student';
// import Test from './Test';
// import Mark from './Mark';




 
class Spec extends derived<string>() {}
 
Spec.prop; // string
Spec.anotherProp; // string

type Ctor<T> = new (...args:any[]) => T;
type ModelCtor = Ctor<Course> | Ctor<Student> | Ctor<Test> | Ctor<Mark>
type TableDescription = [string, ModelCtor];
type DbSchema = readonly TableDescription[];

const coursesFilePath = process.argv[2],
studentsFilePath = process.argv[3],
testsFilePath = process.argv[4],
marksFilePath = process.argv[5],
outputFilePath = process.argv[6];

const appSchema: Schema = [
  [coursesFilePath, Course],
  [studentsFilePath, Student],
  [testsFilePath, Test],
  [marksFilePath, Mark]
] 


class AppSchema {
  async loadTables(){
    const loadingTables = tableDescriptions.map(([path, OrmClass]) => {
        return new Table(path, OrmClass)
      })

    // goes in order to first failure then breaks
    for await (const loadedTable of loadingTables) {
      console.log(loadedTable)
    }
  }
}

// interface SchemaConstructor {
//     new(): Schema;
// }

// const all: SchemaConstructor[] = [Test, Mark];

// function createSchema(): Schema[] {
//   return [new Rhino(), new Elephant(), new Snake()];
// }