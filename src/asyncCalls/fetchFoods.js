import axios from 'axios';

export default async ({ category, item }) => {
    try {
        return await axios(`https://data.ct.gov/resource/y6p2-px98.json?category=${category}&item=${item}`);
    } catch (err) {
        throw new Error(`Request failed with a status of ${err.response.status}`);
    }
}