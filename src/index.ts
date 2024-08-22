import dotenv from "dotenv"
dotenv.config()

import express, { Request, Response } from "express";
import WebSocket from "ws"
import { serverRunner } from "./service/server_service";

const app = express();
const socketServer = new WebSocket.Server({ port: Number(process.env.WS_PORT) });
const port = process.env.PORT || 9696; 

socketServer.on('listening', () => {
    console.log("ready")
})

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

app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();   

});

app.post('/power', (req: Request, res: Response) => {
    const power = req.body.power as string

    if(power.toLocaleLowerCase() === "on") {
        try {
            serverRunner.start();
            return res.json({ message: "Success "});
        } catch(error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
    if(power.toLocaleLowerCase() === "off") {
        try {
            serverRunner.stop();
            return res.json({ message: "Success" });
        } catch(error: any) {
            return res.status(400).json({ message: error.message });
        }
    }
    if(power.toLocaleLowerCase() === "status") {
        return res.json({ message: serverRunner.isRunning() ? "On" : "Off" })
    }

    return res.status(400).json({ message: "Unknown command" });
});

app.listen(port, () => {

});
