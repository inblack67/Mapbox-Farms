import { GET_FOODS } from '../types';

export default (state, action) => {
    const { payload, type } = action;

    switch(type){
        case GET_FOODS: 
        return {
            ...state,
            foods: payload,
            loading: false
        }
        default: return state;
    }
}