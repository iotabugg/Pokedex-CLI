import { api } from "../httpClient.js";
import { formatPokemonList } from "../formatters/pokemonFormatter.js";
import chalk from "chalk";

async function addFavorite(identifier) {
    try {
        const response = await api.post("/favorites", {
            identifier
        });
        
        console.log("--------------------------------------")
        console.log(chalk.green.bold("✔ Added to favorites:"));
        console.log(chalk.yellow(`${response.data.name} (ID: ${response.data.id})`));
        console.log("--------------------------------------")
    } catch (error) {
        handleApiError(error);
    }
}

async function listFavorites(options) {
    try {
        const res = await api.get("/favorites");

        if (options.json) {
            console.log(JSON.stringify(res.data, null, 2));
            return;
        }
        console.log("--------------------------------------")
        console.log(chalk.yellow.bold("★ Favorite Pokémons:"));
        formatPokemonList(res.data);
    } catch (err) {
        handleApiError(err);
    }
}

const isInteractive = process.argv.length <= 2;
function handleApiError(error) {

    if (error.response) {
        const status = error.response.status;

        if (status === 404) {
            console.error("Pokémon not found.");
        } else if (status === 409) {
            console.error("Pokémon already in favorites.");
        } else if (status === 400) {
            console.error("Invalid request.");
        } else {
            console.error("API error occurred.");
        }
    } else if (error.request) {
        console.error(
            "Cannot connect to API. Is the server running?"
        );
    } else {
        console.error("Unexpected error:", error.message);
    }

    if(!isInteractive) process.exit(1);
}

export { addFavorite, listFavorites };
