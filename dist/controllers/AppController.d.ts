declare class App {
    #private;
    private outputFilePath;
    migrate(): Promise<this>;
    private loadCsvRecords;
    render(): {
        students: any[];
    } | {
        error: "Invalid course weights";
    };
}
declare class AppController {
    create(): App;
    show(app: App): {
        students: any[];
    } | {
        error: "Invalid course weights";
    };
    update(app: App): Promise<App>;
}
export declare const AppControllerSingleton: AppController;
export declare const update: (app: App) => Promise<App>;
export declare const show: (app: App) => {
    students: any[];
} | {
    error: "Invalid course weights";
};
declare const _default: {
    AppControllerSingleton: AppController;
    update: (app: App) => Promise<App>;
    show: (app: App) => {
        students: any[];
    } | {
        error: "Invalid course weights";
    };
};
export default _default;
