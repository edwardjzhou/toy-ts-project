/** 
 * TO RUN from home directory:
 * node ./dist/app.js examples/Example1/courses.csv examples/Example1/students.csv examples/Example1/tests.csv examples/Example1/marks.csv output1.json
 * ts-node ./src/app.ts examples/Example1/courses.csv examples/Example1/students.csv examples/Example1/tests.csv examples/Example1/marks.csv output1.json
 * node ./dist/app.js examples/Example2/courses.csv examples/Example2/students.csv examples/Example2/tests.csv examples/Example2/marks.csv output2.json
 * ts-node ./src/app.ts examples/Example2/courses.csv examples/Example2/students.csv examples/Example2/tests.csv examples/Example2/marks.csv output2.json
 * WE ASSUMED:
    * (a) no edge cases in data's format => we don't use a CSV parsing library;
    * (b) no large files => we don't use filestreams;
    * (c) always valid input => we don't validate command line args;
    * (d) the program runs to completion (not a server) => we assume data stays the same after one pass;
    * (e) the program will never be used modularly => we use imports with side effects;
    * (f) the only programmer will be myself => we use idiosyncratic names;
*/

import { AppControllerSingleton as app, update, show } from './controllers/AppController'
if (process.env?.USER !== `edward`) console.log = () => {}

const principalsApp = app.create();
update(principalsApp).then(show);