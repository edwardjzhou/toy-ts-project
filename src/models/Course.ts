// import AbstractRecordModel from '../abstracts/AbstractRecordModel'

interface CourseSchema {
  id: number;
  name: string;
  teacher: string;
}

interface fml {
  // name: string;
  // teacher: string;
}

let mock = {
  id: 5, 
  name: 'ed',
  teacher: 'me!',
  fail: 324234
}

 abstract class AbstractRecordModel<T extends {}> {
    private static collection = []

    public static all()
    {
        return this.collection
    }

    public static create<M>(parsed: M): M
    {
        return parsed;
    }

    // checks for presence, uniqueness of an id PK if it exists
    abstract validate(obj: T): boolean
}


export default class Course extends AbstractRecordModel<CourseSchema> {
  public id;
  name;
  teacher; 

  constructor(  { id, name, teacher}: CourseSchema){
    super();
    this.id = Number(id);
    this.name = name;
    this.teacher = teacher;
  }

  
  // constructor(public id: CourseSchema['id'] , name: CourseSchema['name'], teacher: CourseSchema['teacher']){
  //   super();
    // this.id = Number(id);
    // this.name = name;
    // this.teacher = teacher;
  // }
  validate(a:fml){
    return false
  }

}
// const {id, name, teacher} = mock
// const test = new Course(id,name,teacher)
// let d = test.name
const test = new Course(mock)
console.log(JSON.stringify(test),test.id)
// console.log(Course.all())
// Course.create(mock)
// test.validate({})


    // interface ReadableStream extends EventEmitter {
    //     readable: boolean;
    //     read(size?: number): string | Buffer;
    //     setEncoding(encoding: BufferEncoding): this;
    //     pause(): this;
    //     resume(): this;
    //     isPaused(): boolean;
    //     pipe<T extends WritableStream>(destination: T, options?: { end?: boolean | undefined; }): T;
    //     unpipe(destination?: WritableStream): this;
    //     unshift(chunk: string | Uint8Array, encoding?: BufferEncoding): void;
    //     wrap(oldStream: ReadableStream): this;
    //     [Symbol.asyncIterator](): AsyncIterableIterator<string | Buffer>;
    // }

    // interface WritableStream extends EventEmitter {
    //     writable: boolean;
    //     write(buffer: Uint8Array | string, cb?: (err?: Error | null) => void): boolean;
    //     write(str: string, encoding?: BufferEncoding, cb?: (err?: Error | null) => void): boolean;
    //     end(cb?: () => void): void;
    //     end(data: string | Uint8Array, cb?: () => void): void;
    //     end(str: string, encoding?: BufferEncoding, cb?: () => void): void;
    // }
type YO = {bar:string}


abstract class FooAbstract<T> {
    abstract bar(x?:T): T
}

class Foo extends FooAbstract<{ bar: string }> { 
    bar(x: YO = {bar:'bar'}) { 
        return { bar: 'bar' };
    }
}

class FooMaker<FOO extends FooAbstract<BAR>, BAR> {  
    constructor(public foo: FooAbstract<BAR>,  yo:number) {}

    bar():BAR { 
        return this.foo.bar();
    }

    baz = (): BAR => {
        return this.foo.bar();
    }
}


// class FooMaker<FOO extends FooAbstract<{ bar: string }>> {  
//     constructor(public foo: FOO) {}

//     bar():{ bar: string } { 
//         return this.foo.bar();
//     }

//     baz = (): { bar: string } => {
//         return this.foo.bar();
//     }
// }
// console.log(JSON.stringify(FooMaker.prototype.bar.toString()))

let foo = new Foo();
let result = foo.bar();
// let foomaker = new FooMaker<Foo>(new Foo());


let foomaker = new FooMaker<Foo, { bar: string}>(new Foo(),23);
let foo2 = foomaker.foo; // Type "Foo", OK
console.log(foomaker)
let result1 = foomaker.foo.bar(); // Type "{bar: string}", OK
let result2 = foomaker.bar(); // Type "{bar: string}", OK
let result3 = foomaker.baz(); // Type "{bar: string}", OK