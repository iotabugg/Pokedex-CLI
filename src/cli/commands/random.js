import { api } from "../httpClient.js";
import { formatPokemon } from "../formatters/pokemonFormatter.js";
const isInteractive = process.argv.length <= 2;
export async function randomPokemon(options) {
    try {
        const MAX_POKEMON_ID = 1017;

        const randomId =
            Math.floor(Math.random() * MAX_POKEMON_ID) + 1;

        const res = await api.get(`/pokemon/${randomId}`);
        if (options.json) {
            console.log(JSON.stringify(res.data, null, 2));
            return;
        }

        formatPokemon(res.data);
    } catch (err) {
        console.error("Failed to fetch random Pokémon.");
        if(!isInteractive) process.exit(1);
    }
}
