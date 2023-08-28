import { Colors, SlashCommandBuilder } from "discord.js"; // Imports necessary modules from "discord.js"
import { SlashCommand } from "../../types"; // Imports the SlashCommand type from the "../../types" file
import { EmbedBuilder } from "@discordjs/builders"; // Imports the EmbedBuilder class from the "@discordjs/builders" library

// Defines a slash command for displaying the bot's ping
export const command: SlashCommand = {
    name: 'ping', // Specifies the command name as 'ping'
    data: new SlashCommandBuilder() // Constructs the command data using a SlashCommandBuilder
        .setName('ping') // Sets the command name
        .setDescription("Displays the bot's ping."), // Sets the command description
        
    // Async function to execute the 'ping' command
    execute: async (interaction) => {
        // Sends a reply with an embedded message
        await interaction.reply({
            embeds: [
                // Creates an embedded message with a purple color and ping information
                new EmbedBuilder()
                    .setColor(Colors.Purple)
                    .setDescription(`Pong!\nPing: ${interaction.client.ws.ping}`)
            ]
        });
    }
};