"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * “node app.js courses.csv students.csv tests.csv marks.csv output.json”
 * for the principal's use, we assumed:
 * 1. small and static data (index-to-row maps for primary keyed csv files)
 * 2. valid command line args
 * 3. tractable csv files (we don't use a csv parser or filestreams; always-valid input; no regex)\
 * to compile: 1. tsc 2. the below
 * ts-node 'src/app.ts' courses.csv students.csv tests.csv marks.csv output.json
*/
const AppController_1 = require("./controllers/AppController");
const principalsApp = AppController_1.AppControl.create();
AppController_1.AppControl.update(principalsApp).then(() => {
    AppController_1.AppControl.show(principalsApp);
});
