import { ChildProcess, spawn } from "child_process";

type listenerFunction = (arg0: string) => void

function emptyListener(d: string) { }

export default class ServerRunner {
    private path: string;
    private options: string[];

    private stdOutListener = emptyListener;
    private stdErrorListener = emptyListener;
    private closeListener = emptyListener;
    private disconnectListener = emptyListener;
    private exitListener = emptyListener;

    private spawner: ChildProcess | undefined = undefined;

    constructor(path: string, options: string[]) {
        this.path = path;
        this.options = options;
    }    

    public setStdOutListener(f: listenerFunction) {
        this.stdOutListener = f;
        this.spawner!.stdout?.on('data', this.stdOutListener);
    }

    public setStdErrorListener(f: listenerFunction) {
        this.stdErrorListener = f;
        this.spawner!.on('error', this.stdErrorListener);
    }

    public setCloseListener(f: listenerFunction) {
        this.closeListener = f;
        this.spawner!.on('close', this.closeListener);
    }

    public setdisconnectListener(f: listenerFunction) {
        this.disconnectListener = f;
        this.spawner!.on('disconnect', this.disconnectListener);
    }

    public setExitFunction(f: listenerFunction) {
        this.exitListener = f;
        this.spawner!.on('exit', this.exitListener);
    }

    public start() {
        console.log(`.\\tModLoader\\${this.path}`)
        this.spawner = spawn( "cmd.exe", ["/c", `.\\tModLoader\\${this.path}`, ...this.options]);
    }

    public send(message: string) {
        this.spawner!.stdin?.write(message + "\n");
        this.spawner!.stdin?.end();
    }

    public stop() {
        this.send("exit");
    }
};