import { getApiClient } from "../httpClient.js";
import { formatPokemonList } from "../formatters/pokemonFormatter.js";
import { getConfig } from "../../config/runtimeConfig.js";

const isInteractive = process.argv.length <= 2;
export async function searchPokemon(query, options) {
    try {
        const config = getConfig()
        const api = getApiClient()
        const res = await api.get('/search', {
            params: { q: query }
        });
        // console.log("step 1 complete.")
        const output =
            options.json
                ? "json" : config.output
        if (output === "json") {
            console.log(JSON.stringify(res.data, null, 2))
            return
        }

        console.log(`Search results for "${query}":`);
        formatPokemonList(res.data);
    } catch (err) {
        console.log(err)
        console.error("Search failed.");
        if (!isInteractive) process.exit(1);
    }
}
