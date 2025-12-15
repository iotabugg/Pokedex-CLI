import chalk from "chalk"
import { getPokemon } from "../services/pokemonService.js";

export function registerGetCommand(program) {
    program
        .command("get <identifier>")
        .description("Get pokemon by name or ID")
        .action(async (identifier) => {
            try {
                const pokemon = await getPokemon(identifier);
                console.log(chalk.green.bold(pokemon.name.toUpperCase()));
                console.log("ID: ", pokemon.id);
                console.log("Types: ", pokemon.types.join(", "))
                console.log("Abilities: ", pokemon.abilities.join(", "))
            } catch (error) {
                if(error.message === "POKEMON_NOT_FOUND") {
                    console.error(chalk.red("Pokemon not found."))
                }
                else {
                    console.error(chalk.red("Failed to fetch Pokemon. Try Again!"))
                }
            }
        });
}