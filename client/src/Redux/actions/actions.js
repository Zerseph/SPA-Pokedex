import axios from "axios";

import {
    GET_ALLPOKEMONS,
    SET_CURRENT_PAGE
} from "../actions-types/actionsTypes";


export function getAllPokemons() {
    return async function (dispatch) {
        try {
            let response = await axios.get("/pokemons/");
            dispatch({
                type: GET_ALLPOKEMONS,
                payload: response.data,
            });
        } catch (error) {
            console.error('there was an error in the pokemon search', error);
            dispatch({
                type: 'GET_ALLPOKEMONS_ERROR',
                payload: error.message // O cualquier otro formato de error que desees
            });
        }
    }
}


export function setCurrentPage(pageNumber) {
    return {
        type: SET_CURRENT_PAGE,
        payload: pageNumber
    };
}