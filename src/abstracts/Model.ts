// copies ActiveRecord's take: https://guides.rubyonrails.org/active_record_validations.html

interface Storage<T> {
    _collection: T[];
}
interface Access<T>  {
    all(): T[];
    add(): void;
}
interface Collection<T> extends Storage<T>, Access<T>{}



// base for records
class Records {//implements Collection, Access {
    // only inheritors and self
    _collection
    protected constructor(){
        // ctor._collection = T[]
        // Object.setPrototypeOf(this, Records.prototype.constructor);
    }

    // private static _collection: any[] = []

    // public static get all()
    // {
    //     return this._collection
    // }

    // // pushes new T() into _collection
    // private static add(record: any) 
    // {
    //     this._collection.push(record);
    //     return this;
    // }
}
// let a = new Records()

// base model for records; records are instances of a Model
// a ROW OBJECT (new Course() will have this type from inheritance )
// if a sub class has a constructor it must call super
export default abstract class Model<Schema> extends Records {
    // override this like an abstract method
    // checks for presence, uniqueness of an id PK if it exists
    abstract validate(obj: Schema): boolean;
}

class Z extends Records<Z>{
    constructor(ctor: Z){
        super(ctor)
    }   
}

let omg = new Z(Z) //         console.log(new.target, this)  is  [class Z extends Records] Z {}
// console.log(Z.all, Z.ctor)


abstract class AbstractRecordModel<T> {
    private static _collection = []

    public static all()
    {
        return this._collection
    }

    abstract create(x?:T): T
    // create<M>(t:M){
    //     return new this()
    // }
    // creates from POJO? or string
    // abstract create()

    // saves to _collection
    abstract save(): void
    
    // override this like an abstract method
    // checks for presence, uniqueness of an id PK if it exists
    validate(){}

}

// class RecordMaker<MODEL extends AbstractRecordModel<model>, model> {  
//     constructor(public foo: FooAbstract<BAR>,  yo:number) {}

//     bar(): MODEL { 
//         return this.foo.bar();
//     }
// }

// class Test extends Model<{
//     constructor(){
//         super()
//     }
// }

// interface CourseSchema {
//   id: number;
//   name: string;
//   teacher: string;
// }

// interface fml {
//   // name: string;
//   // teacher: string;
// }

// let mock = {
//   id: 5, 
//   name: 'ed',
//   teacher: 'me!',
//   fail: 324234
// }