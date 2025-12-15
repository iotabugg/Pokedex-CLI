import axios from "axios"

const BASE_URL = "https://pokeapi.co/api/v2";

export async function fetchPokemon(identifier) {
    try {
        const response = await axios.get(
            `${BASE_URL}/pokemon/${identifier.toString().toLowerCase()}`
        );
        return response.data;
    } catch (error) {
        if(error.response?.status === 404) {
            throw new Error("POKEMON_NOT_FOUND");
        }
        throw new Error("POKEAPI_UNAVAILABLE");
    }
}