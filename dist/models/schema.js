"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
// let df = "0.2" as unknown as number
// extends [...infer front, infer back]? back:0
// type d =`1`
// function pred<T extends `${1}`>(arg: T){
//     return +arg as const
//     // return parseInt(arg)
//     // return parseFloat(arg)
// }
// type asdf = ReturnType< typeof pred>
// const toNum = (arg: `${Grade}.${Grade}` ):number=> parseFloat(arg)
// type df<T extends `${Grade}.${Grade}`> = (arg: T) => number extends (arg: T) =>  parseFloat(T) infer I ? I : never
// type Map = {
//   '0': []
//   '1': [1]
//   '2': [...Map['1'], 1]
//   '3': [...Map['2'], 1]
//   '4': [...Map['3'], 1]
//   '5': [...Map['4'], 1]
//   '6': [...Map['5'], 1]
//   '7': [...Map['6'], 1]
//   '8': [...Map['7'], 1]
//   '9': [...Map['8'], 1]
// }
// type Make10Array<T extends any[]> = [
//   ...T,
//   ...T,
//   ...T,
//   ...T,
//   ...T,
//   ...T,
//   ...T,
//   ...T,
//   ...T,
//   ...T
// ]
// type ToNumber<
//   S extends string,
//   L extends any[] = []
// > = S extends `${infer F}${infer R}`
//   ? ToNumber<R, [...Make10Array<L>, ...(F extends keyof Map ? Map[F] : never)]>
//   : L['length']
