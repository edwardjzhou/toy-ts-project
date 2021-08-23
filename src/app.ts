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