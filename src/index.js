#!/usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import { connectDB, disconnectDB } from "./db/connection.js";
import { registerGetCommand } from "./commands/get.js";
import { registerSearchCommand } from "./commands/search.js";
import { registerRandomCommand } from "./commands/random.js";

await connectDB();

const program = new Command();

program
    .name("pokedex")
    .description("CLI tool to explore pokemon data")
    .version("1.0.0");

registerGetCommand(program)
registerSearchCommand(program)
registerRandomCommand(program)


await program.parseAsync(process.argv);

await disconnectDB()