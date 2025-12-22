import { getApiClient } from "../httpClient.js";
import { formatPokemon } from "../formatters/pokemonFormatter.js";
import { getConfig } from "../../config/runtimeConfig.js";
import { getSession } from "../../config/runtimeSession.js";

const isInteractive = process.argv.length <= 2;

export async function getPokemonCli(identifier, options) {
    try {
        const session = getSession()
        const config = getConfig()
        const api = getApiClient();
        const res = await api.get(`/pokemon/${identifier}`);
        if (session) {
            session.lastPokemon = res.data
        }
        const output =
            options?.json === true || config.output === "json"
                ? "json"
                : "pretty";

        if (output === "json") {
            console.log(JSON.stringify(res.data, null, 2));
            return;
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
