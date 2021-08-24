export declare abstract class BaseController<T> {
    abstract index(...args: any[]): T[] | Partial<T>[];
    create?(...args: any[]): any;
    show?(a: any): any;
    abstract update?(a: any): any;
}
export default BaseController;
