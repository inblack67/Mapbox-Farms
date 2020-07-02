import React, { useReducer } from 'react';
import { GET_FOODS } from '../types';
import FoodReducer from './foodReducer';
import FoodContext from './foodContext';
import fetchFoods from '../../asyncCalls/fetchFoods'
import M from 'materialize-css/dist/js/materialize.min.js';

const FoodState = (props) => {

    const initialState = {
        foods: [], 
        loading: true
    }

    const [state, dispatch] = useReducer(FoodReducer, initialState);

    const getFoods = async ({ category, item }) => {
        try {
            const res = await fetchFoods({ category, item });

            if(res.data.length === 0){
                M.toast({ html: 'Nothing Found' });
            }

            dispatch({
                type: GET_FOODS,
                payload: res.data
            });
            
        } catch (err) {
            if(err.response){
                M.toast({ html: `${err.response.status} Error` })
            }
            console.error(err);
        }
    }

    return (
        <FoodContext.Provider value={{
            foods: state.foods,
            getFoods,
        }}>
            { props.children }
        </FoodContext.Provider>
    )
}

export default FoodState;
