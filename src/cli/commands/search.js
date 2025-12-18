import { api } from "../httpClient.js";
import chalk from "chalk";


export async function searchPokemon(query) {
  try {
    const res = await api.get('/search', {
      params: { q: query }
    });
    // console.log("step 1 complete.")
    if (res.data.length === 0) {
      console.log("No Pokémon found.");
      return;
    }
    console.log("Search results:");
    res.data.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} (ID: ${p.id})`);
    });
  } catch (err) {
    // console.log(err)
    console.error("Search failed.");
    process.exit(1);
  }
}
