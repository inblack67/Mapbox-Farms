import React, { useReducer } from 'react';
import { GET_ALL_FOODS, FETCH_ERROR } from '../types';
import FoodReducer from './foodReducer';
import FoodContext from './foodContext';
import fetchAllFoods from '../../asyncCalls/fetchAllFoods'
import M from 'materialize-css/dist/js/materialize.min.js';

const FoodState = (props) => {

    const initialState = {
        allFoods: null,
        loading: true
    }

    const [state, dispatch] = useReducer(FoodReducer, initialState);

    const getAllFoods = async () => {
        try {
            const res = await fetchAllFoods();

            const data = res.data;

            if(data.length === 0){
                M.toast({ html: 'Nothing Found' });
            }

            dispatch({
                type: GET_ALL_FOODS,
                payload: data
            });
            
        } catch (err) {
            if(err.response){
                M.toast({ html: `${err.response.status} Error` })
            }
            console.error(err);
            dispatch({
                type: FETCH_ERROR
            })
        }
    }

    return (
        <FoodContext.Provider value={{
            allFoods: state.allFoods,
            getAllFoods
        }}>
            { props.children }
        </FoodContext.Provider>
    )
}

export default FoodState;
