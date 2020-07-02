import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';

export default async ({ category, item }) => {
    try {
        return await axios(`https://data.ct.gov/resource/y6p2-px9.json?category=${category}&item=${item}`);
    } catch (err) {

        if(err.response){
            M.toast({ html: `${err.response.status} Error` })
        }

        throw new Error(`Request failed with a status of ${err.response.status}`);
    }
}