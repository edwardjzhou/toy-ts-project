import { Course } from './Course';
import type { CourseSchema, CourseRecord } from './Course';
import { Mark } from './Mark';
import type { MarkSchema, MarkRecord } from './Mark';
import { Student } from './Student';
import type { StudentSchema, StudentRecord } from './Student';
import { Test } from './Test';
import type { TestSchema, TestRecord } from './Test';
export declare type Grade = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 39 | 40 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 49 | 50 | 51 | 52 | 53 | 54 | 55 | 56 | 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64 | 65 | 66 | 67 | 68 | 69 | 70 | 71 | 72 | 73 | 74 | 75 | 76 | 77 | 78 | 79 | 80 | 81 | 82 | 83 | 84 | 85 | 86 | 87 | 88 | 89 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97 | 98 | 99 | 100;
export declare type ForeignKey = number;
export declare type PrimaryKey = number;
export declare type GradeGrade = `${Exclude<Grade, 100>}.${Grade}` | `${Grade}.${0}`;
export declare type Model = typeof Student | typeof Test | typeof Mark | typeof Course;
export declare type ModelRecord = InstanceType<Model>;
export declare type Record = StudentRecord | TestRecord | MarkRecord | CourseRecord;
export declare type Schema = StudentSchema | TestSchema | MarkSchema | CourseSchema;
export declare type ForeignKeyPropNamesInSchema<S extends Schema> = {
    [P in keyof S]: P extends `${string}_id` ? P : never;
}[keyof S];
export declare type IsPrimaryKeyedSchema<S extends Schema> = S extends {
    id: PrimaryKey;
} ? true : false;
export declare type PKedRecord = {
    id: PrimaryKey;
} & Record;
export declare type NoPKRecord = {
    id?: never;
} & Schema;
