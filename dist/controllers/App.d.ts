declare class App {
    #private;
    private outputFilePath;
    run(): void;
    migrate(): Promise<void[]> | never;
    render(): void;
}
declare const _default: App;
export default _default;
