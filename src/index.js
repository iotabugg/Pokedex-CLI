#!/usr/bin/env node
import { Command } from "commander";
import { registerGetCommand } from "./commands/get.js";
import { registerSearchCommand } from "./commands/search.js";
import { registerRandomCommand } from "./commands/random.js";

const program = new Command();

program
    .name("pokedex")
    .description("CLI tool to explore pokemon data")
    .version("1.0.0");

registerGetCommand(program)
registerSearchCommand(program)
registerRandomCommand(program)


program.parse(process.argv);