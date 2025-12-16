import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
    {
        pokemonId: {
            type: Number,
            required: true,
            unique:true
        },
        data: {
            type: Object,
            required:true
        }
    },
    {
        timestamps:true
    }
)
export const Favorite = mongoose.model("Favorite", favoriteSchema)