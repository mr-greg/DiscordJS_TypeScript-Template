import { Events } from "discord.js";
import { BotEvent } from "../types";

export const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute: async (client: { user: { tag: any; }; }) => {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    }
}