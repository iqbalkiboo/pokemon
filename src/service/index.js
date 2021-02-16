import Get from "./Get";

// get to axios
const getListPokemon = () => Get("evolution-chain??offset=20&limit=20", "", false);
const getPokemon = (id) => Get("evolution-chain", id, true);
const getPokemonSpecies = (id) => Get("pokemon-species", id, true);

const API = {
    getListPokemon,
    getPokemon,
    getPokemonSpecies,
}

export default API;