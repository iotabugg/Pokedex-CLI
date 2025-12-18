import { api } from "../httpClient.js";
import chalk from "chalk";

export async function randomPokemon() {
  try {
    const MAX_POKEMON_ID = 1017;

    const randomId =
      Math.floor(Math.random() * MAX_POKEMON_ID) + 1;

    const res = await api.get(`/pokemon/${randomId}`);
    const pokemon = res.data;

        console.log(chalk.green.bold(pokemon.name.toUpperCase()));
        console.log("ID: ", pokemon.id);
        console.log("Types: ", pokemon.types.join(", "))
        console.log("Abilities: ", pokemon.abilities.join(", "))
  } catch (err) {
    console.error("Failed to fetch random Pokémon.");
    process.exit(1);
  }
}
