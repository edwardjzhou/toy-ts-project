import fs from 'fs';
// aka a Model or the object representation of a row from a table, adhering to its schema, in a queryable way

// type Split<S extends string, D extends string> =
//     string extends S ? string[] :
//         S extends '' ? [] :
//             S extends `${infer T}${D}${infer U}` ?  [T, ...Split<U, D>] :  [S];

type PrimaryKey = {
    id: number
}
interface Record extends PrimaryKey {
    [field: string]: any;
}

const rec1:Record = {
  id: 1,
  name: 'ed'
}

type HeaderTuple<T> = keyof Record
type myTuple<Record> = ['id', 'name']

// type RecordTuple<T> = [keyof T]
// interface 
// let h: RecordTuple = ['id', 1]

// const row1: Record = [1, 'hey'];



// interface Queryable<T> extends PrimaryKey {
//     [P in keyof T]: ForeignKeys[P]
// }


// abstract class Row implements Queryable {}

// interface Parser<RowData<FileFormat>> {
//     isReadyPromise;
//     isReadyPromiseResolver;
//     rawData: RowData;
// }

// class Table<Model<Schema> extends Controller> {
//     headers: string[];
//     rows:;
// }
// interface AnimalConstructor {
//     new(): Animal;
// }

// const all: AnimalConstructor[] = [Cat, Dog];


// export class Calculator {
//   private current = 0;
//   private memory = 0;
//   private operator: string;
//   protected processDigit(digit: string, currentValue: number) {
//     if (digit >= "0" && digit <= "9") {
//       return currentValue * 10 + (digit.charCodeAt(0) - "0".charCodeAt(0));
//     }
//   }
//   protected processOperator(operator: string) {
//     if (["+", "-", "*", "/"].indexOf(operator) >= 0) {
//       return operator;
//     }
//   }
//   protected evaluateOperator(
//     operator: string,
//     left: number,
//     right: number
//   ): number {
//     switch (this.operator) {
//       case "+":
//         return left + right;
//       case "-":
//         return left - right;
//       case "*":
//         return left * right;
//       case "/":
//         return left / right;
//     }
//   }
//   private evaluate() {
//     if (this.operator) {
//       this.memory = this.evaluateOperator(
//         this.operator,
//         this.memory,
//         this.current
//       );
//     } else {
//       this.memory = this.current;
//     }
//     this.current = 0;
//   }
//   public handleChar(char: string) {
//     if (char === "=") {
//       this.evaluate();
//       return;
//     } else {
//       let value = this.processDigit(char, this.current);
//       if (value !== undefined) {
//         this.current = value;
//         return;
//       } else {
//         let value = this.processOperator(char);
//         if (value !== undefined) {
//           this.evaluate();
//           this.operator = value;
//           return;
//         }
//       }
//     }
//     throw new Error(`Unsupported input: '${char}'`);
//   }
//   public getResult() {
//     return this.memory;
//   }
// }
// export function test(c: Calculator, input: string) {
//   for (let i = 0; i < input.length; i++) {
//     c.handleChar(input[i]);
//   }
//   console.log(`result of '${input}' is '${c.getResult()}'`);
// }

// import { Calculator } from "./Calculator";
// class ProgrammerCalculator extends Calculator {
//   static digits = [
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//   ];
//   constructor(public base: number) {
//     super();
//     const maxBase = ProgrammerCalculator.digits.length;
//     if (base <= 0 || base > maxBase) {
//       throw new Error(`base has to be within 0 to ${maxBase} inclusive.`);
//     }
//   }
//   protected processDigit(digit: string, currentValue: number) {
//     if (ProgrammerCalculator.digits.indexOf(digit) >= 0) {
//       return (
//         currentValue * this.base + ProgrammerCalculator.digits.indexOf(digit)
//       );
//     }
//   }
// }
// // Export the new extended calculator as Calculator
// export { ProgrammerCalculator as Calculator };
// // Also, export the helper function
// export { test } from "./Calculator";





// const getWeather = async (
//   city: string
// ): Promise<{ temp: number; humidity: number } | null> => {
//   const temp = await externalTemperatureAPI(city);
//   if (!temp) {
//     console.log(`Error fetching temperature for ${city}`);
//     return null;
//   }
//   const humidity = await externalHumidityAPI(city);
//   if (!humidity) {
//     console.log(`Error fetching humidity for ${city}`);
//     return null;
//   }
//   return { temp, humidity };
// };
// // ...
// const weather = await getWeather("Berlin");
// if (weather === null) console.log("getWeather() failed");
// We can use tuples to enforce type safety when we intend to simultaneously return both response and error results from a function call
// We can use tuples to group similar data or payloads together, e.g., a cartesian coordinate, enforcing element types in a custom csv file
// We can also use tuples to create specific types comprised of multiple other types
// Tuples can generally be used as parameter lists to function signatures or calls
// import { Ok, Err, Result } from "ts-results";

// type Errors = "CANT_FETCH_TEMPERATURE" | "CANT_FETCH_HUMIDITY";

// const getWeather = async (
//   city: string
// ): Promise<Result<{ temp: number; humidity: number }, Errors>> => {
//   const temp = await externalTemperatureAPI(city);
//   if (!temp) return Err("CANT_FETCH_TEMPERATURE");

//   const humidity = await externalHumidityAPI(city);
//   if (!humidity) return Err("CANT_FETCH_HUMIDITY");

//   return Ok({ temp, humidity });
// };

// // ...

// const weatherResult = await getWeather("Berlin"); // weatherResult is fully typed
// if (weatherResult.err) console.log(`getWeather() failed: ${weatherResult.val}`);
// if (weatherResult.ok) console.log(`Weather is: ${JSON.stringify(weather.val)}`);
// Consider the example below:

// declare function example(...args: [string, number]): void;
// The rest parameter expands the elements of the tuple type into discrete parameters. When the function is called, args, which is represented as a rest parameter, is expanded to look exactly like the function signature below:

// declare function example(args0: string, args1: number): void;

// enum EventType {
//   Mouse,
//   Keyboard,
// }
// interface Event {
//   timestamp: number;
// }
// interface MyMouseEvent extends Event {
//   x: number;
//   y: number;
// }
// interface MyKeyEvent extends Event {
//   keyCode: number;
// }
// function listenEvent(eventType: EventType, handler: (n: Event) => void) {
//   /* ... */
// }
// // Unsound, but useful and common
// listenEvent(EventType.Mouse, (e: MyMouseEvent) => console.log(e.x + "," + e.y));
// // Undesirable alternatives in presence of soundness
// listenEvent(EventType.Mouse, (e: Event) =>
//   console.log((e as MyMouseEvent).x + "," + (e as MyMouseEvent).y)
// );
// listenEvent(EventType.Mouse, ((e: MyMouseEvent) =>
//   console.log(e.x + "," + e.y)) as (e: Event) => void);


// export namespace ShowIdEnum {
//   export const ALWAYS = 'always';
//   export const LABEL = 'label';
//   export const NEVER = 'never';
// };
// export type ShowIdEnum = typeof ShowIdEnum[keyof typeof ShowIdEnum];



// interface ViewShadow extends Pick<View, keyof View> { }


// type MySingleton = {
//     getId(): string;
//     doSomething1(str: string): string;
//     doSomething2(num: number): number;
// }

// const MySingleton: MySingleton = {
//     getId: function () {
//         ...
//     },
//     doSomething1: function(str: string): string {
//         ...
//     },
//     doSomething2: function (num: number): number {
//         ...
//     }
// }

// export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
// export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;

// export default class ParsedTable<Model> extends Table<Model>, Readable<Csv> {
//     rowObjs;
//     path;
//     model;

//     constructor(path, model) {
//         super()
//         this.path = path;
//         this.model = model;
//         this.isReadyPromise = new Promise(res => {this.isReadyPromiseResolver = res});
//         this.readTableFile();
//         return this.isReadyPromise;
//     }

//     readTableFile(){
//         fs.readFile(this.path, 'utf8' , (err, rawData) => {
//             if (err) throw err;
//             this.rawData = rawData;
//             this.getHeaderAndRowStrings();
//         })
//     }
    
//     getHeaderAndRowStrings(){
//         const split = this.rawData.split('\n'); 
//         this.headers = split[0].split(',');
//         this.rows = split.slice(1);
//         this.cleanRowStrings();
//     }

//     cleanRowStrings(){      
//         removeEmptyStringsFromArray(this.rows);
//         this.rows = this.rows.map(row => makeNewStringWithoutSpacesAfterComma(row));
//         this.mapRowsToModelObjects();
//     }

//     mapRowsToModelObjects(){
//         this.rowObjs = this.rows.map(this.addIndex.bind(this));
//         this.resolveReady();
//     }

//     addIndex(row){
//         const rowObj = new this.model(...row.split(','))

//         // create a static map of index to rows if there is an id column
//         if (this.headers.includes('id')) {
//             this.model.indexToRowMap ||= new Map()
//             this.model.indexToRowMap.set(row.split(',')[0], rowObj)
//         } else {
//         // else create an `all` array
//             this.model.all ||= []
//             this.model.all.push(rowObj)
//         }
//         return rowObj
        
//     }

//     resolveReady(){
//         this.isReadyPromiseResolver(this.rowObjs);
//     }
// }





// const assert = require('assert');
// // ['3,Math', 'Mrs. C', ''] destructively becomes ['3,Math', 'Mrs. C']
// function removeEmptyStringsFromArray(array){
//     for (let i = 0; i < array.length; i++) {
//         let j = i;
//         while (array[j] === "") j++;
//         array.splice(i, j-i);
//     }
// }
// const emptyTest = ['3,Math', 'Mrs. C', ''];
// removeEmptyStringsFromArray(emptyTest);
// assert.deepStrictEqual(emptyTest.filter(ele => ele === '').length, 0);

// // '2,History, Mrs. P' becomes '2,History,Mrs. P'
// function makeNewStringWithoutSpacesAfterComma(string){
//     let answer = '';
//     for (let i = 0; i < string.length; i++) {
//         let j = i;
//         while (string[i] === ',' && string[j+1] === ' ') j++;
//         answer += string[i];
//         i = j;
//     }
//     return answer;
// }
// assert.deepStrictEqual(makeNewStringWithoutSpacesAfterComma('2,History, Mrs. P'), '2,History,Mrs. P');
