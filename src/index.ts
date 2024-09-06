import dotenv from "dotenv"
dotenv.config()

import { socketServer } from "./service/ws_service";
import { http } from "./service/http_service";

const port = process.env.PORT || 9696; 

socketServer.on('listening', () => {
    console.log("socket ready")
})

http.listen(port, () => {
    console.log("http ready")
});

