export abstract class BaseController<T> {
    public abstract index(...args: any[]): T[] | Partial<T>[]
    public create?(...args: any[]): any;
    public show?(a: any): any;
    public update?(a: any): any;
}
export default BaseController