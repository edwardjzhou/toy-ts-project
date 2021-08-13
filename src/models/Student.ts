import Mark from "./Mark";
// import AbstractController from "../abstracts/Controller"

interface StudentSchema {
  id: 5;
  name;
}

export default class Student {
  id;
  name;

  // derived columns for JSON output 
  totalAverage;
  courses; // final join from mark belongs to -> test belongs to -> course

  // join columns
  marks;
  tests;
  static indexToRowMap;

  constructor(id, name){
    this.id = Number(id);
    this.name = name;
    this.totalAverage = NaN;
    this.courses = [];
  }


  
}


class A{constructor(hey:string){}}
type a = ConstructorParameters<A>

type ddf = [string, number]
let h: keyof ddf = 324

type d = 'a'|'b'
type asdf = keyof d


class C {
  x = 0;
  y = 0;
}
let df: C = new C()
let dfd: new (...args:any[]) => C = C
let zz: typeof C = C
// typeof C has prototype so its more restrictive than type C
type T0 = InstanceType<typeof C>; // back to C


function toHex(this: Number) {
  return this.toString(16);
}
 
function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}


interface CatInfo {
  age: number;
  breed: string;
}
 
type CatName = "miffy" | "boris" | "mordred";
 
const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: "Persian" },
  boris: { age: 5, breed: "Maine Coon" },
  mordred: { age: 16, breed: "British Shorthair" },
};