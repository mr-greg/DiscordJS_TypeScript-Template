import { PathLike } from "fs";
import { REST, Routes } from 'discord.js';
import { clientId, guildId, token } from '../config.json';
import fs from 'node:fs';
import path from 'node:path';
import { SlashCommand } from "./types";

const commands = [];

const foldersPath:PathLike = path.join(__dirname, 'commands');
const commandFolders:string[] = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath:PathLike = path.join(foldersPath, folder);
    const commandFiles:string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath:PathLike = path.join(commandsPath, file);
        
        const { command }: { command: SlashCommand } = require(filePath);        

        commands.push(command.data.toJSON());
    }
}

const rest:REST = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );
        // @ts-ignore
        console.log(`Successfully reloaded ${data.length} application (/) commands.`); 
    } catch (error) {
        console.error(error);
        
    }
})();