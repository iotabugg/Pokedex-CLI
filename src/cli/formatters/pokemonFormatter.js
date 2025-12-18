import chalk from "chalk";

export function formatPokemon(pokemon) {
    console.log("-------------------------------------")
    console.log(chalk.yellow.bold(`${pokemon.name.toUpperCase()} (ID: ${pokemon.id})`))
    
    console.log(`Types     : ${pokemon.types.join(", ")}`);
    console.log(`Abilities : ${pokemon.abilities.join(", ")}`);
    console.log(`Height    : ${pokemon.height}`);
    console.log(`Weight    : ${pokemon.weight}`);
    console.log("-------------------------------------")
}

export function formatPokemonList(pokemonList) {
    if (pokemonList.length === 0) {
        console.log("No Pokémon found.");
        return;
    }
    console.log("--------------------------------------")
    pokemonList.forEach((p, index) => {
      console.log(chalk.magentaBright.bold(
        `${index + 1}. ${p.name} (ID: ${p.id})`)
      );
    });
    console.log("--------------------------------------")
}