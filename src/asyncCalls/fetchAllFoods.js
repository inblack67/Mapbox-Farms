import axios from 'axios';
import M from 'materialize-css/dist/js/materialize.min.js';

export default async () => {
    try {
        return await axios(`https://data.ct.gov/resource/hma6-9xbg.json`);
    } catch (err) {

        if(err.response){
            M.toast({ html: `${err.response.status} Error` })
        }

        throw new Error(`Request failed with a status of ${err.response.status}`);
    }
}