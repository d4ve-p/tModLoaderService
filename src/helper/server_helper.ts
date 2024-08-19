import { SERVER } from "../types/server";


export function getServerRunner(type: SERVER): string {
    if (type == SERVER.WINDOWS) {
        return "start-tModLoaderServer.bat";
    } else if(type == SERVER.LINUX) {
        return "start-tModLoaderServer.sh";
    } else throw new Error("InvalidServerType");
}

