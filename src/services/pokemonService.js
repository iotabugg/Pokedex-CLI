import { fetchPokemon } from "../api/pokeapi.js";
import { PokemonCache } from "../db/pokemonCache.model.js";


export async function getPokemon(identifier){
    const key = identifier.toString().toLowerCase();

    const cached = await PokemonCache.findOne({
        $or: [
            {pokemonId: Number(key) || -1},
            {"data.name" : key}
        ]
    });

    if(cached){
        // console.log("Cache hit")
        return cached.data;
    } 

    const pokemon = await fetchPokemon(key)
    const shapedPokemon = {
        id : pokemon.id,
        name: pokemon.name,
        height: pokemon.height,
        weight : pokemon.weight,
        types: pokemon.types.map(t => t.type.name),
        abilities: pokemon.abilities.map(a => a.ability.name)
    };
    await PokemonCache.create({
        pokemonId:shapedPokemon.id,
        data:shapedPokemon
    })
    return shapedPokemon
}