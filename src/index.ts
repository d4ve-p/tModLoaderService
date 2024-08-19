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
    serverRunner.start()

    serverRunner.setStdOutListener((data) => {
        console.log(data)
        // ws.send(data)
    })
})

socketServer.on('connection', ws => {
    ws.send("connection established")
})



app.post('/', (req: Request, res: Response) => {
})

app.listen(port, () => {

})
