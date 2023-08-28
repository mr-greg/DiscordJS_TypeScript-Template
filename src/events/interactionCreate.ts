import { CommandInteraction, CacheType } from "discord.js";
import { BotEvent, SlashCommand } from "../types";

const { Events } = require('discord.js');

export const event: BotEvent = {
    name: Events.InteractionCreate,
    execute: async (interaction: CommandInteraction<CacheType>) => {
        if (!interaction.isChatInputCommand()) return;

        const command:SlashCommand = interaction.client.slashCommands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found`);
            return;
        }
        
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(`Error executing ${interaction.commandName}`);
			console.error(error);          
        }
    }
}
