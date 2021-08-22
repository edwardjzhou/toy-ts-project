declare class App {
    #private;
    migrate(): Promise<void>;
    private loadCsvRecords;
    private joinAndComputeRecords;
    render(): unknown;
    constructor();
}
declare class AppController {
    create(): App;
    show(app: App): unknown;
    update(app: App): Promise<void>;
}
export declare const AppControl: AppController;
export {};
