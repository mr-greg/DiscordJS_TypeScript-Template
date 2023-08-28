import { Events, CommandInteraction, SlashCommandBuilder, Collection } from "discord.js";

declare module "discord.js" {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>
    }
}

export interface BotEvent {
    name: string,
    once?: boolean | false,
    execute: (...args) => void
}

export interface SlashCommand {
    name: string,
    data: SlashCommandBuilder,
    async execute : (interaction: CommandInteraction) => Promise<void>
}

export{}