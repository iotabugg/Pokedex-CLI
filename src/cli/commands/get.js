import { api } from "../httpClient.js";
import chalk from "chalk"

export async function getPokemonCli(identifier) {
    try {
        const res = await api.get(`/pokemon/${identifier}`);

        const pokemon = res.data;

        console.log(chalk.green.bold(pokemon.name.toUpperCase()));
        console.log("ID: ", pokemon.id);
        console.log("Types: ", pokemon.types.join(", "))
        console.log("Abilities: ", pokemon.abilities.join(", "))
    } catch (err) {
        if (err.response?.status === 404) {
            console.error("Pokémon not found.");
        } else {
            console.error("Failed to fetch Pokémon.");
        }
        process.exit(1);
    }
}
