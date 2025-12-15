import mongoose from "mongoose";

const pokemonCacheSchema = new mongoose.Schema(
    {
        pokemonId: {
            type:Number,
            required:true,
            unique:true
        },
        data: {
            type: Object,
            required: true
        },
        createdAt: {
            type:Date,
            Default: Date.now,
            expires: 60*60*24,
        }
    }
);
export const PokemonCache = mongoose.model(
    "PokemonCache",
    pokemonCacheSchema
)