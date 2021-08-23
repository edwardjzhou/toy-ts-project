if (process.env?.USER !== `edward`) console.log = () => {}
import { resolve } from 'path/posix';
/** 
 * from home directory:
 * node ./dist/app.js examples/Example1/courses.csv examples/Example1/students.csv examples/Example1/tests.csv examples/Example1/marks.csv output1.json
 * ts-node ./src/app.ts examples/Example1/courses.csv examples/Example1/students.csv examples/Example1/tests.csv examples/Example1/marks.csv output1.json
 * node ./dist/app.js examples/Example2/courses.csv examples/Example2/students.csv examples/Example2/tests.csv examples/Example2/marks.csv output2.json
 * ts-node ./src/app.ts examples/Example2/courses.csv examples/Example2/students.csv examples/Example2/tests.csv examples/Example2/marks.csv output2.json
 * for the principal's use, we assumed:
 * 1. small and static data (index-to-row maps for primary keyed csv files)
 * 2. valid command line args 
 * 3. tractable csv files (we don't use a csv parser or filestreams; always-valid input; no regex)
 * to compile: 1. tsc 2. the below
 * ts-node 'src/app.ts' courses.csv students.csv tests.csv marks.csv output.json
*/

import { AppControllerSingleton as app, update, show } from './controllers/AppController'
const principalsApp = app.create();
update(principalsApp).then(show);



// problems encountered were working on promise resolution
// let resolver;
// let first = new Promise(resolve => {
//      resolver = resolve
// })
// synchronous().then(()=>console.log(3)) 
// Promise.resolve().then(()=>console.log(1)).then(()=>console.log(4))
// first.then(()=> console.log(2))

// async function synchronous(){
//     resolver()
//     await void 0
// }

// synchronous() is equivalent to Promise.resolve(void 0).then(() => undefined)
// rewritten equivalent:
// Promise.resolve().then(()=> undefined)     .then(()=>console.log(3))
// Promise.resolve().then(()=> console.log(1)).then(()=>console.log(4))
// Promise.resolve().then(()=> console.log(2))

// the then function is only put into the microtask/promise queue after chaining promise has fired