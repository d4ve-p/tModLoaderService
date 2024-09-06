import WebSocket from "ws";
import { serverRunner } from "./server_service";

export const socketServer = new WebSocket.Server({ port: Number(process.env.WS_PORT) });
socketServer.on('connection', ws => {
    ws.send("connection established")

    serverRunner.pushClient(ws);
    
    ws.on('message', (message) => {
        try {
            serverRunner.send(message.toString());
            serverRunner.callClient((other) => {
                if(other !== ws)
                    other.send(`Anonymous sent a command: ${message.toString()}`)
            })
        } catch(error: any) {
            ws.send(error.toString());
        }
        
    })
})