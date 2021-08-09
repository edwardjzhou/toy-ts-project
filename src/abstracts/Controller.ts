
export default abstract class Controller<T extends Model> {
    constructor(cls: typeof Model){
        
        if (cls.id) {
        }
    }
    // aka show, findOne
    static findById(){}

    createFromImport(){}
    
    // 1.create objs 2. run query 3.format for json 
    createView(){}

    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-3.html
    makeUnique<T>(
        collection: Set<T> | T[],
        comparer: (x: T, y: T) => number
    ): Set<T> | T[] {

        if (collection instanceof Set) return collection;
    
    // Sort the array, then remove consecutive duplicates.
    collection.sort(comparer);
    for (let i = 0; i < collection.length; i++) {
        let j = i;
        while (
        j < collection.length &&
        comparer(collection[i], collection[j + 1]) === 0
        ) {
        j++;
        }
        collection.splice(i + 1, j - i);    
    }
    return collection;
    }

}

let c = new Controller<MyModel>(MyModel);