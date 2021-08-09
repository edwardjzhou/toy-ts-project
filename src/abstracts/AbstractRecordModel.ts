// copies ActiveRecord's take: https://guides.rubyonrails.org/active_record_validations.html
// a ROW OBJECT (new Course() will have this type from inheritance )

// abstract static getters and setters
export default  class AbstractRecordModel<T> {
    private static collection = []

    public static all()
    {
        return this.collection
    }

    public static save()
    {
        return new this()
        // return parsed;
    }
    
    // override this like an abstract method
    // checks for presence, uniqueness of an id PK if it exists
    validate(){}

}


