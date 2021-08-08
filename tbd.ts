// interface SomeType {
//   /** This is an index signature. */
//   [propName: string]: any;
// }

// abstract class SuperClass {
//     abstract someMethod(): void;
//     badda() {}
// }
 
// type AbstractConstructor<T> = abstract new (...args: any[]) => T
 
// function withStyles<T extends AbstractConstructor<object>>(Ctor: T) {
//     abstract class StyledClass extends Ctor {
//         getStyles() {
//             // ...
//         }
//     }
//     return StyledClass;
// }
 
// class SubClass extends withStyles(SuperClass) {
//     someMethod() {
//         this.someMethod()
//     }
// }
// // type MyConstructorOf<T> = abstract new (...args: any[]) => T;
// abstract class AsyncReadable<ReadableData> {
//     isReadyPromise: Promise<boolean>;
//     isReadyPromiseResolver: (d: ReadableData) => void;
// }

// abstract class Table<Row> {
//     abstract lookupRelation(a: any[]): Row
// }


// abstract class Keyed {
//     id: string | number
// }

// abstract class Queryable {
//     findUnique(){

//     }

// }

// class BeeKeeper {
//   hasMask: boolean = true;
// }
 
// class ZooKeeper {
//   nametag: string = "Mikle";
// }
 
// class Animal {
//   numLegs: number = 4;
// }
 
// class Bee extends Animal {
//   keeper: BeeKeeper = new BeeKeeper();
// }
 
// class Lion extends Animal {
//   keeper: ZooKeeper = new ZooKeeper();
// }
 
// function createInstance<A extends Animal>(c: new () => A): A {
//   return new c();
// }
 
// createInstance(Lion).keeper.nametag;
// createInstance(Bee).keeper.hasMask;

// type ExtractPII<Type> = {
//   [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
// };
 
// type DBFields = {
//   id: { format: "incrementing" };
//   name: { type: string; pii: true };
// };
 
// type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
                 
// type ObjectsNeedingGDPRDeletion = {
//     id: false;
//     name: true;
// }
// // https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
// type Getters<Type> = {
//     [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
// };
 
// interface Person {
//     name: string;
//     age: number;
//     location: string;
// }
 
// type LazyPerson = Getters<Person>;
         
// type LazyPerson = {
//     getName: () => string;
//     getAge: () => number;
//     getLocation: () => string;
// }


// runtime checking with type guards