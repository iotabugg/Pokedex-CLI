import { api } from "../httpClient.js";

async function addFavorite(identifier) {
  try {
    const response = await api.post("/favorites", {
      identifier
    });

    console.log("✔ Added to favorites:");
    console.log(`${response.data.name} (ID: ${response.data.id})`);
  } catch (error) {
    handleApiError(error);
  }
}

async function listFavorites() {
  try {
    const response = await api.get("/favorites");

    if (response.data.length === 0) {
      console.log("No favorites yet.");
      return;
    }

    console.log("★ Favorite Pokémon:");
    response.data.forEach((pokemon, index) => {
      console.log(
        `${index + 1}. ${pokemon.name} (ID: ${pokemon.id})`
      );
    });
  } catch (error) {
    handleApiError(error);
  }
}

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

  process.exit(1);
}

export { addFavorite, listFavorites };
