declare class App {
    #private;
    migrate(): Promise<this>;
    private loadCsvRecords;
    render(): unknown;
}
declare class AppController {
    create(): App;
    show(app: App): unknown;
    update(app: App): Promise<App>;
}
export declare const AppControllerSingleton: AppController;
export declare const update: (app: App) => Promise<App>;
export declare const show: (app: App) => unknown;
declare const _default: {
    AppControllerSingleton: AppController;
    update: (app: App) => Promise<App>;
    show: (app: App) => unknown;
};
export default _default;
