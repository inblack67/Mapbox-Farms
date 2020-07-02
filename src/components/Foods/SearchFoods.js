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
        const newSearch = {
            category: category.split('')[0].toUpperCase() + category.slice(1),
            item: item.split('')[0].toUpperCase() + item.slice(1),
        }
        getFoods(newSearch);
        setFormData({
            category: '',
            item: ''
        });
    }

    const { category, item } = formData;

    return (
        <div className="container">
            <p className="flow-text center white-text">Search Your Food</p>
            <form onSubmit={onSubmit} data-testid='submit'>

                <div className="input-field">
                    <input type="text" name='category' value={category} required onChange={onChange}/>
                    <label htmlFor="category">Food Category</label>
                    <span className="helper-text white-text">eg. Fruit</span>
                </div>

                <div className="input-field">
                    <input type="text" name='item' value={item} required onChange={onChange}/>
                    <label htmlFor="item">Foods Item</label>
                    <span className="helper-text white-text">eg. Apples</span>
                </div>

                <div className="input-field">
                    <input type="submit" value="Search" className='btn red'/>
                </div>
            </form>
        </div>
    )
}

export default SearchFoods
