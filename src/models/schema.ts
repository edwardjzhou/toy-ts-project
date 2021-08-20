import fs from 'fs';
import { Course } from './Course';
import { Mark } from './Mark';
import { Student } from './Student';
import { Test } from './Test';

import type { StudentSchema } from './Student'
import type { TestSchema } from './Test'
import type { MarkSchema } from './Mark'
import type { CourseSchema } from './Course'

import type { PrimaryKey } from './types'
import { Module } from 'module';
import BaseRecord from 'abstract/BaseRecord';

function dd<T extends Model>(...args: T[]){
    return args
}

type lessSelective = 'a' | 'b' extends 'a' ? true: false // false



type obj = {
    name: string
}
// type dfsdf = Pick<obj, 'anydthing'| 'name'>

type sex =  Student & Model

let ed: sex = {id:12, name:''}

type ass =  Model['prototype']

// type ddd = typeof Student.prototype extends typeof Student ? true: false
// type ddd =  Student extends typeof Student['prototype'] ? true: false
// type ddd<R extends Record> =  R extends infer I | Model['prototype'] ? I: false
// type bbbb<T> = T extends <infer I>{hey:5} ? I : I
// type ccc = ddd<Student>


// type ewr =typeof Student extends Student[`prototype`] ? 1: 0
// type ddd<R extends Record> = R extends infer { I: infer J} ? J : 0
// type tdffest = ddd<Student> 
// type GG<R extends Record> = R extends Pick<infer I, ConstructorParameters<Model>> ? I: false
// type primitive = string | number | boolean | undefined | null;
// type DeepReadonly<T> = T extends primitive ? T : DeepReadonlyObject<T>;
type DeepReadonlyObject<R extends Model['prototype']> = {
    // readonly [P in keyof T]: DeepReadonly<T[P]>;
    [P in keyof T]: T[P] extends infer I ? I : never ;

} & Model

type sdf = DeepReadonlyObject<Student>
type d = GG<Student>

// let tester:<T extends any ? 1 : 0>(): a
// type cc<T extends Model ? T= true: T = false> = false
// type dfsdf = cc<1> 

// super.all in static childclass
type My<R extends Record> = R extends  (new(...args: any[]) => R extends infer I ? I : 324) ? true : never

type your = My<Student> 

dd(Student)

let FML = new Student(1,'df') 
type FUCK = [keyof typeof FML]['length']
// type ModelFromSchema<S extends Schema> = ObjValueTuple<S> extends Parameters<infer R> ? R: never
// type ModelForRecord<R extends Record> = R extends R & Model ? R: never
type sdfdf= [keyof typeof FML]['length']

// type adsdf<M extends Model, A extends any[] = [] > = A[A['length']] = keyof M
// type sdfdsf = <infer M>(a:Model) => (number extends (a:any)=>number ? 1 : 0)
// type sdfdsf = <R extends Record>(a:Model) => (R extends (new A()) ? 1: 0)

type TEST = {
    [P in keyof {1:2, 3:4}]: number
    // [P in Model as string]: P
}[keyof P]

// type sdfdsf<R extends Record> = R extends (a: infer M) => R
// let h: sdfdsf = ()=>0
// keyof (UNION| of objects) => names of common keys unioned
// keyof (INTERSECTION& of objects) => all key names unioned



// function IsPrimaryKeyedSchema<S> (modelInstance: Record): modelInstance is IsPrimaryKeyedSchema {
//     return 'id' in modelInstance 
// }
// function isForeignKeyed (modelInstance: Record): modelInstance is PrimaryKeyed {
//     // for (const key of Reflect.ownKeys(modelInstance)) {
//     //     if (key.includes('_id')) return true
//     // }
//     return false
// }

// isForeignKeyed({
//     key: 'df',
//     df: {}
// })

export type Model = typeof Student | typeof Test | typeof Mark | typeof Course;
export type Record = Student | Test | Mark | Course
export type RecordForModel<M extends Model> = M extends new(...args: any[]) => infer R ? R extends Record ? R : never : never
export type Schema = StudentSchema | TestSchema | MarkSchema | CourseSchema // aka new Model(): Record; { Model CTOR parameter types }
// export type Controller = StudentController// | CourseController | TestController | MarkController


export type ForeignKeyPropNamesInSchema<S extends Schema> = {
  [P in keyof T]: P extends `${string}_id` ? P : never
}[keyof S]

// predicate type
type IsPrimaryKeyedSchema<S extends Schema> = S extends { id: PrimaryKey } ? true : false 

// could STILL HAVE A FK
export type PKSchema = { id: PrimaryKey } & Schema 

// no PK schema guaranteed to have FK
export type NotPrimaryKeyedSchema = { id?: never } & Schema 


 




// // from https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type/55128956#55128956
type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

type Push<T extends any[], V> = [...T, V];

type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

type ObjValueTuple<T, KS extends any[] = TuplifyUnion<keyof T>, R extends any[] = []> =
  KS extends [infer K, ...infer KT] // K = first key, KT = remainder; ternary is true as long as KS is still not empty array[]
  ? ObjValueTuple<T, KT, [...R, T[K & keyof T]]>
  : R


