export enum SERVER {
    WINDOWS,
    LINUX
};

export function getServerType(server: string) {
    if(server.toLowerCase() == "windows")
        return SERVER.WINDOWS
    else if(server.toLowerCase() == "linux")
        return SERVER.LINUX
    else throw new Error("InvalidServerName")
}