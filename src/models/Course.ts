interface CourseSchema {
  id: number;
  name: string;
  teacher: string;
}
interface CourseSchema {
  id: number;
  name: string;
  teacher: string;
}

export default class Course extends <CourseSchema> {
  public id;
  name;
  teacher; 

  constructor(  { id, name, teacher}: CourseSchema){
    super();
    this.id = Number(id);
    this.name = name;
    this.teacher = teacher;
  }

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

