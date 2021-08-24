declare class App {
    #private;
    private outputFilePath;
    run(): void;
    migrate(): Promise<void[]>;
    render(): void;
}
export default App;
