import fetchFoods from './asyncCalls/fetchFoods';
import fetchAllFoods from './asyncCalls/fetchAllFoods';

it('fetches all food trucks/farms', async () => {
    const res = await fetchAllFoods();

    expect(res.data[0].category).toEqual('Farm Products');

    expect(res.data[0].location_1).toEqual( { longitude: '-71.98244322', latitude: '41.3253323' });
})

it('fetches searched food trucks/farms', async () => {
    const res = await fetchFoods({ category: 'Fruit', item: 'Peaches' });

    expect(res.data[0].category).toEqual('Fruit');

    expect(res.data[0].location_1).toEqual({ type: 'Point', coordinates: [-79.402352, 45.649393] });
})