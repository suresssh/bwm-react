import { FETCH_RENTALS, FETCH_RENTAL_FIND_BY_ID } from './types';
import axios from 'axios';
export const fetchList = () => dispatch => {
    axios.get('/api/v1/rentals').then((rentals) => {
        dispatch({ type: FETCH_RENTALS, rentals: rentals.data });
    })
}

export const fetchRentalById = (rentalId) => dispatch => {
    let rental = {};
    dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: {} });

    setTimeout(() => {
        axios.get(`/api/v1/rentals/${rentalId}`).then((rental) => {
            if (rental !== undefined && rental !== null){
                dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: rental.data });
            }
            else
                dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: {} });
        })

    }, 1000);

    if (rental === undefined) {
        rental = {}
    }
}