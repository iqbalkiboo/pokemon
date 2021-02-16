
import { DATA_LIST_POKEMON, DATA_DETAIL_POKEMON } from './actionTypes';

const initialState = {
    dataListPokemon: {},
    dataDetailPokemon: {},
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        // masukan data sehabis fetch api ke state dataListPokemon 
        case DATA_LIST_POKEMON:
            state = {
                ...state,
                dataListPokemon: action.payload,
            }
            break;
        case DATA_DETAIL_POKEMON:
            state = {
                ...state,
                dataDetailPokemon: action.payload,
            }
            break;
        default:
            break;
    }
    return state
}

export default dataReducer;