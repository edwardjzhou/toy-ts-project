/**
 * TO RUN from home directory:
 * node ./dist/app.js examples/Example1/courses.csv examples/Example1/students.csv examples/Example1/tests.csv examples/Example1/marks.csv output1.json
 * ts-node ./src/app.ts examples/Example1/courses.csv examples/Example1/students.csv examples/Example1/tests.csv examples/Example1/marks.csv output1.json
 * node ./dist/app.js examples/Example2/courses.csv examples/Example2/students.csv examples/Example2/tests.csv examples/Example2/marks.csv output2.json
 * ts-node ./src/app.ts examples/Example2/courses.csv examples/Example2/students.csv examples/Example2/tests.csv examples/Example2/marks.csv output2.json
 */

import app from "./controllers/App";

app.run();
