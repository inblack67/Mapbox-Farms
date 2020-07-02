import React, { useState, useContext } from 'react'
import FoodContext from '../../context/foods/foodContext'

const SearchFoods = () => {

    const [formData, setFormData] = useState({
        category: '',
        item: ''
    });

    const foodContext = useContext(FoodContext);

    const { getFoods } = foodContext

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = e => {
        e.preventDefault();
        getFoods(formData);
    }

    const { category, item } = formData;

    return (
        <div className="container">
            <form onSubmit={onSubmit}>

                <div className="input-field">
                    <input type="text" name='category' value={category} required onChange={onChange}/>
                    <label htmlFor="category">Foods Category</label>
                </div>

                <div className="input-field">
                    <input type="text" name='item' value={item} required onChange={onChange}/>
                    <label htmlFor="item">Foods Item</label>
                </div>

                <div className="input-field">
                    <input type="submit" value="Search" className='btn red'/>
                </div>
            </form>
        </div>
    )
}

export default SearchFoods
