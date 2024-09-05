import express, { Request, Response } from "express";
import { serverRunner } from "./server_service";

export const http = express();

http.use(express.json());

http.post('/power', (req: Request, res: Response) => {
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