import fs from 'fs';
import { Course } from './Course';
import { Mark } from './Mark';
import { Student } from './Student';
import { Test } from './Test';

import type { StudentSchema } from './Student'
import type { TestSchema } from './Test'
import type { MarkSchema } from './Mark'
import type { CourseSchema } from './Course'
import { Module } from 'module';



function isPrimaryKeyed<T>(aModelClassInstance: any): aModelClassInstance is T {
    return 'id' in aModelClassInstance 
}

export type Model = typeof Student | typeof Test | typeof Mark | typeof Course;
export type Record = Student | Test | Mark | Course
export type RecordForModel<M extends Model> = M extends new(...args: any[]) => infer R ? R extends Record ? R : never : never
export type Schema = StudentSchema | TestSchema | MarkSchema | CourseSchema
// export type Controller = StudentController// | CourseController | TestController | MarkController









// type ModelForSchema<S extends Schema> = Extract<ConstructorParameters<Model>,ObjValueTuple<S>>
// type test = ModelForSchema<StudentSchema>




// type TupleToUnion<T> = T extends any[] ? T[number] : never
// // from https://stackoverflow.com/questions/55127004/how-to-transform-union-type-to-tuple-type/55128956#55128956
// type UnionToIntersection<U> =
//   (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never
// type LastOf<T> =
//   UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

// type Push<T extends any[], V> = [...T, V];

// type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
//   true extends N ? [] : Push<TuplifyUnion<Exclude<T, L>>, L>

// type ObjValueTuple<T, KS extends any[] = TuplifyUnion<keyof T>, R extends any[] = []> =
//   KS extends [infer K, ...infer KT] // K = first key, KT = remainder; ternary is true as long as KS is still not empty array[]
//   ? ObjValueTuple<T, KT, [...R, T[K & keyof T]]>
//   : R


