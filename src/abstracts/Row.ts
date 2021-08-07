// aka a Model or the object representation of a row from a table, adhering to its schema, in a queryable way

interface PrimaryKey {
    id: number
}

// interface Queryable<ForeignKeys> extends PrimaryKey {
//     [P in keyof ForeignKeys]: ForeignKeys[P]
// }


abstract class Row implements Queryable {

}
