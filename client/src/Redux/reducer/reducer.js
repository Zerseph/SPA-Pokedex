import {
    GET_ALLPOKEMONS,
    SET_CURRENT_PAGE
} from "../actions-types/actionsTypes";

const initialState = {
    allPokemonsDefault: [],
    allPokemons: [],
    currentPage: 1,
};

function rootReducer(state = initialState, action) {
    //action recibe: Type y el Payload
    //state recibe: estado actual o inicial(si es primera vez)

    switch (action.type) {
        //CASOS

        //OBTENER TODOS LOS POKEMONS
        case GET_ALLPOKEMONS:
            return {
                ...state,
                allPokemonsDefault: action.payload,
                allPokemons: action.payload,
            }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload,
            };

        default:
            return state;
    }

}


export default rootReducer;