export declare abstract class BaseController<T> {
    abstract index(...args: any[]): T[] | Partial<T>[];
    create?(...args: any[]): any;
    show?(a: any): any;
    update?(a: any): any;
}
export default BaseController;
