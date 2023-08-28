import { Events, CommandInteraction, SlashCommandBuilder, Collection } from "discord.js"; // Imports necessary modules from "discord.js"

// Extends the "Client" interface from "discord.js" to add a custom property
declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand> // Extends "Client" with a collection of slash commands
    }
}

// Defines the structure of a bot event
export interface BotEvent {
    name: string, // The name of the event
    once?: boolean | false, // Indicates if the event should only run once
    execute: (...args) => void // Function to execute when the event occurs
}

// Defines the structure of a slash command
export interface SlashCommand {
    name: string, // The name of the command
    data: SlashCommandBuilder, // The data to build the slash command
    async execute: (interaction: CommandInteraction) => Promise<void> // Async function to execute the command
}

export {} // Exports an empty object to indicate the end of the module