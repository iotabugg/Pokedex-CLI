import express from "express";
import pino from "pino-http";
import { connectDB } from "../../db/connection.js";
import { getPokemon } from "../../services/pokemonService.js";
import {
    addFavorite,
    getFavorite
} from "../../services/favoriteService.js";
import axios from "axios";

export async function startServer() {
    await connectDB();

    const app = express();
    const logger = pino();
    app.use(logger);

    app.use(express.json());

    app.get("/health", (req, res) => {
        res.json({ status: "ok" })
    })

    let pokemonListCache = null;

    app.get("/search", async (req, res) => {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ error: "q is required" });
        }

        const query = q.toLowerCase();

        try {
            // 1️⃣ Try exact match first (keeps current behavior)
            try {
                const pokemon = await getPokemon(query);

                // 🔴 IMPORTANT FIX: handle "not found" that does NOT throw
                if (!pokemon) {
                    throw new Error("POKEMON_NOT_FOUND");
                }

                return res.json([pokemon]);
            } catch (err) {
                console.log("Exact match failed, doing partial search");

                if (
                    err.response?.status !== 404 &&
                    err.message !== "POKEMON_NOT_FOUND"
                ) {
                    throw err;
                }
            }

            // 2️⃣ Load pokemon list once (for partial search)
            if (!pokemonListCache) {
                const listRes = await axios.get(
                    "https://pokeapi.co/api/v2/pokemon?limit=2000"
                );
                pokemonListCache = listRes.data.results;
            }

            // 3️⃣ Partial + case-insensitive match
            const matches = pokemonListCache
                .filter(p => p.name.startsWith(query))

            if (matches.length === 0) {
                return res.json([]);
            }

            // 4️⃣ Fetch full data for matches
            const results = await Promise.allSettled(
                matches.map(p => getPokemon(p.name))
            );

            const detailed = results
                .filter(r => r.status === "fulfilled")
                .map(r => r.value);

            res.json(detailed);

        } catch (err) {
            console.error("Search failed:", err.message);
            res.status(500).json({ error: "Search failed" });
        }
    });



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