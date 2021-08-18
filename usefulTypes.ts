
// type Split<S extends string, D extends string> =
//     string extends S ? string[] :
//         S extends '' ? [] :
//             S extends `${infer T}${D}${infer U}` ?  [T, ...Split<U, D>] :  [S];


// TUPLES 
// return both response and error results from function
// csv file
// We can also use tuples to create specific types comprised of multiple other types
// Tuples can generally be used as parameter lists to function signatures or calls

// NAMESPACES and ENUMS are both converted to JS

// namespace FileTypes {
//   export const csv = 'csv';
//   export const none = ''
// };
// export type ShowIdEnum = typeof ShowIdEnum[keyof typeof ShowIdEnum];
// interface ViewShadow extends Pick<typeof ShowIdEnum, 'ALWAYS'> { }
// type suffixes = typeof FileTypes[keyof typeof FileTypes];
// let h: Pick<typeof Suffixes, 'csv' > = 'csv'
function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key): Pick<Type, Key> {
  return obj[key];
}



type funcParams<T extends (...arg: any) => any> = T extends (...args: infer R) => any ? R : any


// A decorator function which replicates the mixin pattern:
const Pausable = (target: typeof Player) => {
  return class Pausable extends target {
    shouldFreeze = false;
  };
};
 
@Pausable
class Player {
  x = 0;
  y = 0;
}
 
// The Player class does not have the decorator's type merged:
const player = new Player();
player.shouldFreeze;
Property 'shouldFreeze' does not exist on type 'Player'.
 
// It the runtime aspect could be manually replicated via
// type composition or interface merging.
type FreezablePlayer = Player & { shouldFreeze: boolean };
 
const playerTwo = (new Player() as unknown) as FreezablePlayer;
playerTwo.shouldFreeze;





// DEFAULT ARGUMENTS IN GENERIC <> IN CASE NO T IS PASSED
type GConstructor<T = {1:2}> =  T;
let abc: GConstructor = 'df'//{1:2}

type Positionable = GConstructor<{ setPos: (x: number, y: number) => void }>;
type Spritable = GConstructor<Sprite>;




const isString: Predicate<T> = (arg) => {
    return typeof arg === `number`
}

function pluck(o, propertyNames) {
  return propertyNames.map((n) => o[n]);
}
function pluck<T, K extends keyof T>(o: T, propertyNames: K[]): T[K][] {
  return propertyNames.map((n) => o[n]);
}
interface Car {
  manufacturer: string;
  model: string;
  year: number;
}
 
let taxi: Car = {
  manufacturer: "Toyota",
  model: "Camry",
  year: 2014,
};
 
// type StringToArray<S extends string> = S extends `${infer first}${infer rest}` ? [first, ...StringToArray<rest>] : S extends '' ? [] : [S]
// type LengthOfString<S extends string> = StringToArray<S>['length']


type NonFunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
} [keyof T];
type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
 
interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}
 
type T2 = NonFunctionPropertyNames<Part>;
// type T2 = "id" | "name" | "subparts"
// type T3 = FunctionProperties<Part>;
     
// type T3 = {
//     updatePart: (newName: string) => void;
// }
// type T4 = NonFunctionProperties<Part>;
// function foo<U>(x: U) {
//   // Has type 'U extends Foo ? string : number'
//   let a = f(x);
 
//   // This assignment is allowed though!
//   let b: string | number = a;
// }

// type TupleToObject<T extends [any, any]> = { [key in T[0]]: Extract<T, [key, any]>[1] };
// type d = TupleToObject<ConstructorParameters<typeof Student>>
// type GetReadonlyKeys<T extends object> = { [K in keyof T]: K extends { -readonly [K in keyof T]: T[K] }[K] ? K : never }[keyof T]

// type NotFunctionNotPrivateProps<T> 4d= {
//   [K in keyof T]: T[K] extends get (a:any)=>{} ? never : K extends `_${string}` ? never : K;
// }[keyof T]

// type Lookup<T, K> = K extends keyof T ? T[K] : never;
// type TupleFromInterface<T, K extends Array<keyof T>> = { [I in keyof K]: Lookup<T, K[I]> }

// declare class Repo<T, K extends Array<keyof T>> {
//   add(item: T | TupleFromInterface<T, K>): UUID;
// }


// Manufacturer and model are both of type string,
// so we can pluck them both into a typed string array
let makeAndModel: string[] = pluck(taxi, ["manufacturer", "model"]);
 
// If we try to pluck model and year, we get an
// array of a union type: (string | number)[]
let modelYear = pluck(taxi, ["model", "year"]);

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
// Remove types from T that are not assignable to U
type Filter<T, U> = T extends U ? T : never;
 
type T4 = Filter<string | number | (() => void), Function>; // () => void


type FunctionPropertyNames<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
 
type hey ={
    name: string
    yo:string
    id:number
}

type yo = hey[keyof hey]
interface DB {
  filterUsers(filter: (this: User) => boolean): User[];
}
type TypePredicate<T, U extends T> = (x: T) => x is U

function tuple<T extends any[]>(...args: T): T {
  return args;
}

const numbers: number[] = getArrayOfNumbers();
const t1 = tuple("foo", 1, true); // [string, number, boolean]
const t2 = tuple("bar", ...numbers); // [string, ...number[]]


Constructor type for actor<Student>

function isMap(value) {
  return value.toString() === '[object Map]';
}
// unpacking arrays
type ElementType<T> = T extends any[] ? ElementType<T[number]> : T; 

declare function foo(x: string): number;
declare function foo(x: number): string;
function df:foo (x: string) {return 5}

interface Part {
  id: number;
  name: string;
  subparts: Part[];
  updatePart(newName: string): void;
}
 
type T1 = FunctionPropertyNames<Part>;

export interface Predicate<A> {
  (a: A): boolean
}
/**
 * @since 2.11.0
 */
export const not = <A>(predicate: Predicate<A>): Predicate<A> => (a) => !predicate(a)
let hey = not(isString)(23)

/**
 * @since 2.11.0
 */
export const or = <A>(second: Predicate<A>) => (first: Predicate<A>): Predicate<A> => (a) => first(a) || second(a)

/**
 * @since 2.11.0
 */
export const and = <A>(second: Predicate<A>) => (first: Predicate<A>): Predicate<A> => (a) => first(a) && second(a)




class B{}
class C {
  x = 0;
}
let inst1: C = new C()
let inst2: InstanceType<typeof C> = new C() 
let ctor1: new (...args:any[]) => C = C
type Constructor<T> = new (...args: any[]) => T;
let ctor3: typeof B = B
ctor3 = ctor1 
ctor1 = ctor3



class Record<T> {
  key?: T
  hasKey(): this is { key : T } {
    return this.key !== undefined; 
  }
}


 type d = keyof eaads 

// FROM A UNION PICK WHAT TYPES YOU WANT (the second param has to BE LESS PRECISE/WEAKER (Assingable))
 type T1 = Extract<string | number | (() => void), Function>;

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

interface D{
    hey(){return 5}
}

let d: D = {
    hey: ()=>'df'
}

d.hey()

class A{
    private #df=5
}
// interface ArtworkSearchResponse {
//   artists: {
//     name: string;
//     artworks: {
//       name: string;
//       deathdate: string | null;
//       bio: string;
//     }[];
//   }[];
// }

