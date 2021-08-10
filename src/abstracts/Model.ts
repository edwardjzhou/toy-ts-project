// copies ActiveRecord's take: https://guides.rubyonrails.org/active_record_validations.html

// interface Storage<T> {
//     _collection: T[];
// }
// interface Access<T>  {
//     all(): T[];
//     add(): void;
// }
// interface Collection<T> extends Storage<T>, Access<T>{}



// base for records
// class Records {
//     _collection

//     public static get all()
//     {
//         return this._collection ||= []
//     }

//     add = (record: any) =>
//     {
//         // this.constructor?.all.push(record);
//         return this;
//     }
// }


// export default abstract class Model<Schema> extends Records {
//     // checks for presence, uniqueness of an id PK if it exists
//     abstract validate(obj: Schema): boolean;
// }




// abstract class AbstractRecordModel<T> {
//     private static _collection = []

//     public static all()
//     {
//         return this._collection
//     }

//     abstract create(x?:T): T


//     // saves to _collection
//     abstract save(): void
    
//     // override this like an abstract method
//     // checks for presence, uniqueness of an id PK if it exists
//     validate(){}

// }

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