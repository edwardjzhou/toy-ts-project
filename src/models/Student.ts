import Mark from "./Mark";
// import AbstractController from "../abstracts/Controller"

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

