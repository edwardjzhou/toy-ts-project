import Test from './Test';
import Student from './Student';
import Course from './Course';

// interface MarkForeignKeys {
//     test_id;
//     student_id;
// }

// type MarkDerived<T> = {
//     [P in keyof T as `_${P}`]: T[P];
// }


// type Split<S extends string, D extends string> =
//     string extends S ? string[] :
//         S extends '' ? [] :
//             S extends `${infer T}${D}${infer U}` ?  [T, ...Split<U, D>] :  [S];
// type test = Split<'student_id', `_id`>

type ForeignKeyField<S extends string> = S extends `${infer T}_id` ?  T : never;

export default class Mark {
    test_id: number;
    student_id: number;
    mark: number;
    
    static all;
    // joins
    private _test;
    private _student;
    // private _course;
    // derived
    private _weightedMark;

    constructor(test_id, student_id, mark){
        this.test_id = Number(test_id);
        this.student_id = Number(student_id);
        this.mark = Number(mark);
    }

    makeJoins(){
        this.test;
        this.student;
        this.course;
    }

    // a mark belongs to one test
    get test(){
        this._test ||= Test.indexToRowMap.get(this.test_id);
        return this._test;
    }
    // a mark belongs to one student
    get student(){
        this._student ||= Student.indexToRowMap.get(this.student_id);
        return this._student;
    }
    // a test belongs to one course
    // get course(){
    //     this._course ||= this.test.course;

    //     //a student has many DISTINCT courses
    //     this.student.courses ||= new Map()
        
    //     // a mark belongs to both a student and a course
    //     if (this.student.courses.has(this._course)) {
    //         this.student.courses.get(this._course).push(this)
    //     } else {
    //         this.student
    //     }

    //     return this._course;
    // }

    get weightedMark(){
        this._weightedMark ||= this.test.weight*this.mark
        // Math.round(num * 100) / 100
        return this._weightedMark
    }
 


}


// interface MarkFK<T> {
//     [P in keyof T]: number
// }


// let hey: MarkFK<Mark> = {
//   test_id: `1`,
//     student_id: 2,
//     mark: 3
// }

type hey2 = {} & Mark

let yo: hey2 = {}

