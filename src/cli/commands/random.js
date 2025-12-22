import { getApiClient } from "../httpClient.js";
import { formatPokemon } from "../formatters/pokemonFormatter.js";
import { getConfig } from "../../config/runtimeConfig.js";
import { getSession } from "../../config/runtimeSession.js";
const isInteractive = process.argv.length <= 2;
export async function randomPokemon(options) {
    try {
        const session = getSession()
        const config = getConfig()
        const MAX_POKEMON_ID = 1017;

        const randomId =
            Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
        const api = getApiClient()
        const res = await api.get(`/pokemon/${randomId}`);
        if (session) {
            session.lastPokemon = res.data;
        }

        const output =
            options.json
                ? "json" : config.output
        if (output === "json") {
            console.log(JSON.stringify(res.data, null, 2))
            return
        }

        formatPokemon(res.data);
    } catch (err) {
        console.error(err.message);
        console.error("Failed to fetch random Pokémon.");
        if (!isInteractive) process.exit(1);
    }
}
