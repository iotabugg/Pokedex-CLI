import { api } from "../httpClient.js";
import { formatPokemon } from "../formatters/pokemonFormatter.js";

const isInteractive = process.argv.length <= 2;
export async function getPokemonCli(identifier, options) {
    try {
        const res = await api.get(`/pokemon/${identifier}`);

        if(options.json) {
            console.log(JSON.stringify(res.data, null, 2))
            return
        }
        formatPokemon(res.data)

    } catch (err) {
        if (err.response?.status === 404) {
            console.error("Pokémon not found.");
        } else {
            console.error("Failed to fetch Pokémon.");
        }
        if(!isInteractive) process.exit(1);
    }
}
