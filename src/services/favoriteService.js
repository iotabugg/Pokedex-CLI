import { Favorite } from "../db/favorite.model.js";
import { getPokemon } from "./pokemonService.js";

export async function addFavorite(identifier) {
    const pokemon = await getPokemon(identifier)

    const existing = await Favorite.findOne({
        pokemonId: pokemon.id
    })
    if(existing) {
        throw new Error("ALREADY_FAVORITED")
    }
    const favorite = await Favorite.create({
        pokemonId: pokemon.id,
        data:pokemon
    })
    return favorite.data
}

export async function getFavorite() {
    const favorites = await Favorite.find({}, {_id: 0, data: 1})
    return favorites.map(f => f.data)
}