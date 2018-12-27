/**
 * Created by mumarm45 on 23/12/2018.
 */
import {fetchAllNationalities} from "../util/API";
export const RECEIVE_NATIONALITIES = 'RECEIVE_NATIONALITIES';



let receiveNationalities = (nationalities) => {
    return {
        type: RECEIVE_NATIONALITIES,
        nationalities
    }
};


export function handleReceiveNationalities() {
    return (dispatch) => {
        return fetchAllNationalities().then((nationalities) => {
            dispatch(receiveNationalities(nationalities));
        });
    }
}
