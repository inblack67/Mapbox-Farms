import fetchAllFoods from './asyncCalls/fetchAllFoods';
import { loadTestServer } from 'use-mock-service-worker'

const url = `https://data.ct.gov/resource/hma6-9xbg.json`;
const expectedData = [
    { category: 'Farm Products', location_1: { longitude: '-71.98244322', latitude: '41.3253323' }}
]

const server = loadTestServer(url, expectedData);

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeAll(() => server.resetHandlers());

it('fetches all food trucks/farms', async () => {
    const res = await fetchAllFoods();

    expect(res.data[0].category).toEqual('Farm Products');

    expect(res.data[0].location_1).toEqual( { longitude: '-71.98244322', latitude: '41.3253323' });
})

// it('fetches searched food trucks/farms', async () => {
//     const res = await fetchFoods({ category: 'Fruit', item: 'Peaches' });

//     expect(res.data[0].category).toEqual('Fruit');

//     expect(res.data[0].location_1).toEqual({ type: 'Point', coordinates: [-79.402352, 45.649393] });
// })