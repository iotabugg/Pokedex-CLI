import express from "express";
import pino from "pino-http";
import { connectDB } from "../../db/connection.js";
import { getPokemon } from "../../services/pokemonService.js";
import {
    addFavorite,
    getFavorite
} from "../../services/favoriteService.js";

export async function startServer() {
    await connectDB();

    const app = express();
    const logger = pino();
    app.use(logger);

    app.use(express.json());

    app.get("/health", (req, res) => {
        res.json({ status: "ok" })
    })

    app.get("/pokemon/:identifier", async (req, res) => {
        try {
            const pokemon = await getPokemon(req.params.identifier);
            res.json(pokemon)
        } catch (error) {
            if (error.message === "POKEMON_NOT_FOUND") {
                res.status(404).json({ error: "Pokemon not found" })
            } else {
                res.status(500).json({
                    error: "Internal server error"
                })
            }
        }
    })

    app.get("/favorites", async (req, res) => {
        try {
            const favorites = await getFavorite()
            res.json(favorites)
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch favorites" })
        }
    })

    app.post("/favorites", async (req, res) => {
        try {
            const { identifier } = req.body
            if (!identifier) {
                return res.status(400).json({
                    error: "identifier is required"
                })
            }
            const favorite = await addFavorite(identifier)
            res.status(201).json(favorite)
        } catch (error) {
            if (error.message === "ALREADY_FAVORITED") {
                res.status(409).json({
                    error: "pokemon already exists in favorites"
                })
            } else if (error.message === "POKEMON_NOT_FOUND") {
                res.status(404).json({
                    error: " pokemon not found! please enter valid pokemonId or name."
                })
            } else {
                res.status(500).json({
                    error: "Failed to add favorite"
                });
            }
        }
    })

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`API server is running on the port ${PORT}`)
    })
}