import React, { useReducer } from 'react';
import { GET_FOODS } from '../types';
import FoodReducer from './foodReducer';
import FoodContext from './foodContext';
import axios from 'axios'

const FoodState = (props) => {

    const initialState = {
        foods: [], 
        loading: true
    }

    const [state, dispatch] = useReducer(FoodReducer, initialState);

    const getFoods = async ({ category, item }) => {
        try {
            const res = await axios(`https://data.ct.gov/resource/y6p2-px98.json?category=${category}&item=${item}`);

            dispatch({
                type: GET_FOODS,
                payload: res.data
            });
        } catch (err) {
            console.error(err)
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
