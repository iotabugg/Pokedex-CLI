import { fetchPokemon } from "../api/pokeapi.js";

export async function getPokemon(identifier){
    const pokemon = await fetchPokemon(identifier)
    return {
        id : pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight : pokemon.weight,
        types: pokemon.types.map(t => t.type.name),
        abilities: pokemon.abilities.map(a => a.ability.name)
    };
}