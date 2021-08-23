
import { Course } from './Course';
import type { CourseSchema } from './Course';
import { Mark } from './Mark';
import type { MarkSchema } from './Mark';
import { Student } from './Student';
import type { StudentSchema } from './Student';
import { Test } from './Test';
import type { TestSchema } from './Test';

export type Grade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 
| 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 
41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 
61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 |
 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
export type ForeignKey = number;
export type PrimaryKey = number | string;
export type GradeGrade = `${Grade}.${Grade}`;
export type Model = typeof Student | typeof Test | typeof Mark | typeof Course;
export type Record = Student | Test | Mark | Course;
export type RecordForModel<M extends Model> = M extends new(...args: any[]) => infer R ? R extends Record ? R : never : never;
export type Schema = StudentSchema | TestSchema | MarkSchema | CourseSchema;
export type ForeignKeyPropNamesInSchema<S extends Schema> = {
  [P in keyof S]: P extends `${string}_id` ? P : never
}[keyof S];
export type IsPrimaryKeyedSchema<S extends Schema> = S extends { id: PrimaryKey } ? true : false;
export type PKSchema = { id: PrimaryKey } & Schema;
export type NotPrimaryKeyedSchema = { id?: never } & Schema;