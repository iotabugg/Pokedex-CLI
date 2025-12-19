#!/usr/bin/env node
import "dotenv/config";
import { Command } from "commander";
import { getPokemonCli } from "./cli/commands/get.js";
import { addFavorite, listFavorites } from "./cli/commands/fav.js";
import { randomPokemon } from "./cli/commands/random.js";
import { searchPokemon } from "./cli/commands/search.js";
import { startRepl } from "./cli/interactive/repl.js";

export const program = new Command();

program
    .name("pokedex")
    .description("CLI tool to explore pokemon data")
    .version("1.0.0");

program
    .command("get <identifier>")
    .description("Get details of a pokemon by it's Name or Id")
    .option("--json", "Output raw JSON")
    .action(getPokemonCli)
program
    .command("random")
    .description("Get a random pokemon.")
    .option("--json", "Output raw JSON")
    .action(randomPokemon)
program
    .command("search <query>")
    .description("search Pokemon by name.")
    .option("--json", "Output raw JSON")
    .action(searchPokemon)

const favCommand = program
    .command("fav")
    .description("Manage favorite Pokemon")
favCommand
  .command("add [identifier]")
  .description("Add a Pokémon to favorites")
  .option("--json", "Output raw JSON")
  .action(addFavorite);

favCommand
  .command("list")
  .description("List favorite Pokémon")
  .option("--json", "Output raw JSON")
  .action(listFavorites);

if(process.argv.length <= 2) {
    startRepl();
} else {
    program.parseAsync(process.argv);
}

