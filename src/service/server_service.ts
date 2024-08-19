import { spawn } from "child_process";
import { getServerRunner } from "../helper/server_helper";
import { getServerType } from "../types/server";
import ServerRunner from "../types/server_runner";
import { OptionBuilder } from "../types/option";

const server_type = getServerType(process.env.SERVER!);
const file_path = getServerRunner(server_type);
const optionBuilder = new OptionBuilder();

optionBuilder
    .setPort(6969)
    .setPlayerCount(3)

export const serverRunner = new ServerRunner(file_path, optionBuilder.build());