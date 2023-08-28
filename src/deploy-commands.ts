import { PathLike } from "fs"; // Imports the "PathLike" type from the "fs" module
import { REST, Routes } from 'discord.js'; // Imports REST and Routes classes from the 'discord.js' library
import { clientId, guildId, token } from '../config.json'; // Imports client ID, guild ID, and token from 'config.json'
import fs from 'node:fs'; // Imports the 'fs' module (file system operations)
import path from 'node:path'; // Imports the 'path' module to work with file paths
import { SlashCommand } from "./types"; // Imports the SlashCommand type from the "./types" file

const commands = []; // Initializes an array to store command data

const foldersPath: PathLike = path.join(__dirname, 'commands'); // Specifies the path to the 'commands' folder
const commandFolders: string[] = fs.readdirSync(foldersPath); // Reads the list of folders in the 'commands' directory

// Iterates through each command folder
for (const folder of commandFolders) {
    const commandsPath: PathLike = path.join(foldersPath, folder); // Specifies the path to a specific command folder
    const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // Filters for '.js' files in the command folder

    // Iterates through each command file
    for (const file of commandFiles) {
        const filePath: PathLike = path.join(commandsPath, file); // Specifies the path to a specific command file
        
        // Imports the 'command' object from the command file
        const { command }: { command: SlashCommand } = require(filePath);
        
        commands.push(command.data.toJSON()); // Converts command data to JSON format and adds it to the 'commands' array
    }
}

const rest: REST = new REST().setToken(token); // Initializes the REST API with the provided token

// Asynchronous function to refresh application commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // Sends a PUT request to update application commands for a specific guild
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