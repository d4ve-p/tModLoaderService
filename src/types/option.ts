interface Option {
    option_name: string,
    value: string
};

class Options {
    public port: Option = {
        option_name: "port",
        value: process.env.TERRARIA_PORT!,
    };
    public player_count: Option = {
        option_name: "players",
        value: "5",
    };
    public world_name: Option = {
        option_name: "world",
        value: "",
    };
    public password: Option= {
        option_name: "password",
        value: ""
    };

    private pushOption(result:string[], option: Option) {
        if(option.value.length > 0) {
            result.push("-" + option.option_name)
            result.push(option.value)
        }

    }

    public getPort(): string {
        return this.port.value;
    }
    public getPlayerCount(): string {
        return this.player_count.value;
    }
    public getWorldName(): string {
        return this.world_name.value;
    }
    public getPassword(): string {
        return this.password.value;
    }

    public setPort(port: string) {
        this.port.value = port;
    }
    public setPlayerCount(count: string) {
        this.player_count.value = count;
    }
    public setWorldName(name: string) {
        this.world_name.value = `${name}.wld`;
    }
    public setPassword(password: string) {
        this.password.value = password;
    }

    public convert(): string[] {
        let result: string[] = [];
        
        this.pushOption(result, this.player_count)
        this.pushOption(result, this.world_name);
        this.pushOption(result, this.password);
        
        result.push("-nosteam")

        return result;
    }
};

export class OptionBuilder {
    private options: Options = new Options();

    public setPort(port: number): OptionBuilder {
        this.options.setPort(port.toString());
        return this;
    }

    public setPlayerCount(player: number): OptionBuilder {
        this.options.setPlayerCount(player.toString())
        return this;
    }

    public setWorldName(worldName: string): OptionBuilder {
        this.options.setWorldName(worldName);
        return this;
    }

    public setPassword(password: string): OptionBuilder {
        this.options.setPassword(password);
        return this;
    }

    public build(): string[] {
        return this.options.convert();
    }
 };