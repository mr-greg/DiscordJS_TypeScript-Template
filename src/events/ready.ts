import { Events } from "discord.js"; // Imports the Events class from the 'discord.js' library
import { BotEvent } from "../types"; // Imports the BotEvent type from the "../types" file

// Defines an event handler for when the client (bot) becomes ready
export const event: BotEvent = {
    name: Events.ClientReady, // Specifies the event name as "ClientReady"
    once: true, // Indicates that the event handler should only run once
    execute: async (client: { user: { tag: any; }; }) => {
        // Logs a message indicating that the bot is ready
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
};