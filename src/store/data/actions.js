
import { DATA_LIST_POKEMON, DATA_DETAIL_POKEMON } from './actionTypes';

export const getListPokemon = (dataListPokemon) => {
    return {
        type: DATA_LIST_POKEMON,
        payload: { dataListPokemon }
    }
}
export const getDetailPokemon = (dataDetailPokemon) => {
    return {
        type: DATA_DETAIL_POKEMON,
        payload: { dataDetailPokemon }
    }
}