

// export const fetchList = (dispatch) => {
//     dispatch({
//        type:'FETCH_RENTALS',
//        payload: rentals
//    })
// }
import { FETCH_RENTALS, FETCH_RENTAL_FIND_BY_ID } from './types'

export const fetchList = () => dispatch => {
    dispatch({ type: FETCH_RENTALS, rentals: rentals });

}

export const fetchRentalById = (rentalId) => dispatch => {
    let rental = {};
    dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: {} });

    setTimeout(() => {
        rental = rentals.find((rental) => parseInt(rentalId) === rental.id);
        if (rental !== undefined)
            dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: rental });
        else
            dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: {} });
    }, 1000);

    if (rental === undefined) {
        rental = {}
    }


}

const rentals = [{
    id: 1,
    title: "Central Apartment",
    city: "New York",
    street: "Times Sqaure",
    category: "apartment",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 3,
    description: "Very nice apartment",
    dailyRate: 34,
    shared: false,
    createdAt: "24/12/2017"
},
{
    id: 2,
    title: "Central Apartment 2",
    city: "San Francisco",
    street: "Main street",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 12,
    shared: true,
    createdAt: "24/12/2017"
},
{
    id: 3,
    title: "Central Apartment 3",
    city: "Bratislava",
    street: "Hlavna",
    category: "condo",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 2,
    description: "Very nice apartment",
    dailyRate: 334,
    shared: true,
    createdAt: "24/12/2017"
},
{
    id: 4,
    title: "Central Apartment 4",
    city: "Berlin",
    street: "Haupt strasse",
    category: "house",
    image: "http://via.placeholder.com/350x250",
    bedrooms: 9,
    description: "Very nice apartment",
    dailyRate: 33,
    shared: true,
    createdAt: "24/12/2017"
}]