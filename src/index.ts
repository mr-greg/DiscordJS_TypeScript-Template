import { Client, Collection, GatewayIntentBits } from "discord.js";
import { token } from "../config.json";
import { BotEvent, SlashCommand } from "./types";
import path from "path";
import fs, { PathLike } from "fs";

// Create a new client instance
const client:Client = new Client({intents: [GatewayIntentBits.Guilds] });


client.slashCommands = new Collection();

const foldersPath:PathLike = path.join(__dirname, 'commands');
const commandFolders:string[] = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath:PathLike = path.join(foldersPath, folder);
    const commandFiles:string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const filePath:PathLike = path.join(commandsPath, file);
        const { command }: { command: SlashCommand } = require(filePath);
    
        if ('data' in command && 'execute' in command) {
            client.slashCommands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            
        }
    }
}

const eventsPath:PathLike = path.join(__dirname, 'events');
const eventFiles:string[] = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath:PathLike = path.join(eventsPath, file);
    const { event }: { event: BotEvent } = require(filePath);

    console.log(`Log event = ${event}`);
    
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);