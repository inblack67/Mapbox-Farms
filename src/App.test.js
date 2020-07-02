import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import FoodMap from './components/Foods/FoodMap'
import SearchFoods from './components/Foods/SearchFoods'
import FoodState from './context/foods/FoodState'
import fetchFoods from './asyncCalls/fetchFoods';

const renderWithContext = (component) => {
    return render(<FoodState>
        {component}
    </FoodState>)
}

it('renders App component correctly', () => {
    const {asFragment} = render(<App />);
    expect(asFragment).toMatchSnapshot();
});

it('renders SearchFoods component correctly', () => {
    const {asFragment} = renderWithContext(<SearchFoods />);

    expect(asFragment).toMatchSnapshot();
});
it('renders FoodMap component correctly', () => {
    const {asFragment} = renderWithContext(<FoodMap />);

    expect(asFragment).toMatchSnapshot();
});

it('fetches food trucks/farms', async () => {
    const res = await fetchFoods({ category: 'Fruit', item: 'Peaches' });

    expect(res.data[0].category).toEqual('Fruit');

    expect(res.data[0].location_1).toEqual({ type: 'Point', coordinates: [-79.402352, 45.649393] });
})