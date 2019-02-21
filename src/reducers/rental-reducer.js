import { FETCH_RENTAL_FIND_BY_ID, FETCH_RENTALS } from '../actions/types'


const initialState = {
    rentals: {
        data: []
    },
    rental: {
        data: {}
    }
}

export const rentalReducer = (state = initialState.rentals, action) => {
    switch (action.type) {
        case FETCH_RENTALS:
            return { ...state, data: action.rentals };
        default:
            return state;
    }
}

export const rentalByIdReducer = (state = initialState.rental, action) => {
    switch (action.type) {
        case FETCH_RENTAL_FIND_BY_ID:
            return Object.assign({}, state, { data: action.payload });
        default:
            return state;
    }
}


// function getRentalById(rentals, rentalID) {
//     rentals.forEach((rentalItem) => {
//         if (rentalItem.id === parseInt(rentalID)) {
//             // return rentalItem;
//         }
//     })
// }


