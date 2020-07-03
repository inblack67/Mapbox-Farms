import { FETCH_ERROR, GET_ALL_FOODS } from '../types';

export default (state, action) => {
    const { payload, type } = action;

    switch(type){
        case GET_ALL_FOODS: 
        return {
            ...state,
            allFoods: payload,
            loading: false
        }

        case FETCH_ERROR: 
        return {
            ...state,
            allFoods: null,
            loading: false
        }

        default: return state;
    }
}