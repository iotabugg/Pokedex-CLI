import { api } from "../httpClient.js";
import { formatPokemon } from "../formatters/pokemonFormatter.js";
import { program } from "../../index.js";


const isInteractive = process.argv.length <= 2;

export async function getPokemonCli(identifier, options) {
    const session = program.session
    try {
        const res = await api.get(`/pokemon/${identifier}`);
        if (session) {
            session.lastPokemon = res.data
        }

        if (options.json) {
            console.log(JSON.stringify(res.data, null, 2))
            return
        }
        formatPokemon(res.data)

    } catch (err) {
        if (err.response?.status === 404) {
            console.error("Pokémon not found.");
        } else {
            console.log(err.message)
            console.error("Failed to fetch Pokémon.");
        }
        if (!isInteractive) process.exit(1);
    }
}
