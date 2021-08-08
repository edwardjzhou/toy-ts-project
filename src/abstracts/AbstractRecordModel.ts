// copies ActiveRecord's take: https://guides.rubyonrails.org/active_record_validations.html
// a ROW OBJECT (new Course() will have this type from inheritance )

export default abstract class AbstractRecordModel<T>{
     all<T>(x:T):T{
         return x
     }; 
    // runValidations(){}  // checks for presence, uniqueness of an id PK if it exists
}

