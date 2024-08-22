import { ChildProcess, spawn } from "child_process";
import { WebSocket } from "ws";

type listenerFunction = (arg0: string) => void
type clientCaller = (arg0: WebSocket) => void

function emptyListener(d: string) { }

export default class ServerRunner {
    private path: string;
    private options: string[];

    private isCurrentlyRunning = false;

    private stdOutListener = emptyListener;
    private stdErrorListener = emptyListener;
    private closeListener = emptyListener;
    private disconnectListener = emptyListener;
    private exitListener = emptyListener;

    private wsClients: WebSocket[] = [];
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
        this.stdErrorListener = (data) => {
            f(data);
            this.isCurrentlyRunning = false;
        };
        this.spawner!.on('error', this.stdErrorListener);
    }

    public setCloseListener(f: listenerFunction) {
        this.closeListener = (data) => {
            f(data);
            this.isCurrentlyRunning = false;
        };
        this.spawner!.on('close', this.closeListener);
    }

    public setdisconnectListener(f: listenerFunction) {
        this.disconnectListener = (data) => {
            f(data);
            this.isCurrentlyRunning = false;
        };
        this.spawner!.on('disconnect', this.disconnectListener);
    }

    public setExitFunction(f: listenerFunction) {
        this.exitListener = f;
        this.spawner!.on('exit', this.exitListener);
    }

    public start() {
        if(this.isCurrentlyRunning)
            throw new Error("Server is Already Running");

        console.log("Starting")

        this.spawner = spawn( `./tModLoader/${this.path}`, this.options);

        this.setStdOutListener((data) => {
            console.log(data.toString())
            this.callClient((ws) => {
                ws.send(data.toString());
            });
        });

        this.setCloseListener(() => {
            this.callClient((ws) => {
                ws.send("Client closed")
            })
        })

        this.setStdErrorListener(() => {
            this.callClient((ws) => {
                ws.send("Unexpected server error")
            })
        })

        this.setExitFunction(() => {
            this.callClient((ws) => {
                ws.send("Server exited")
            })
        })
        this.isCurrentlyRunning = true;
    }

    public send(message: string) {
        if(!this.isCurrentlyRunning)
            throw new Error("Server is not running");

        this.spawner!.stdin?.write(message + "\n");
    }

    public stop() {
        if(!this.isCurrentlyRunning) 
            throw new Error("Server is not running");

        this.spawner!.kill()
        this.isCurrentlyRunning = false;
    }

    public isRunning(): boolean {
        return this.isCurrentlyRunning
    }

    public pushClient(ws: WebSocket) {
        this.wsClients.push(ws);
    }

    public callClient(caller: clientCaller) {
        for(const ws of this.wsClients)
            caller(ws)
    }
};