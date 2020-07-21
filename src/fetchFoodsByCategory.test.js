import fetchFoods from './asyncCalls/fetchFoods';
import { loadTestServer } from 'use-mock-service-worker'

const category = 'Fruit';
const item = 'Peaches';

const url = `https://data.ct.gov/resource/y6p2-px98.json?category=${category}&item=${item}`;
const expectedData = [
    { category: 'Farm Products', location_1: { longitude: '-71.98244322', latitude: '41.3253323' }}
]

const server = loadTestServer(url, expectedData);

beforeAll(() => server.listen());
afterAll(() => server.close());
beforeAll(() => server.resetHandlers());

it('fetches searched food trucks/farms', async () => {
    const res = await fetchFoods({ category, item });

    expect(res.data[0].category).toEqual('Farm Products');

    expect(res.data[0].location_1).toEqual({ latitude: "41.3253323",longitude: "-71.98244322", });
})