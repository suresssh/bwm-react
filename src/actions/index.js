import { FETCH_RENTALS, FETCH_RENTAL_FIND_BY_ID } from './types';
import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';

import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';
const axiosInstance = axiosService.getInstance();

export const logout = () => {
    authService.invalidateUser();

    return {
        type: LOGOUT
    }
}

export const checkAuthState = () => {
    return dispatch => {
        if (authService.isAuthenticated()) {
            dispatch(loginSuccess());
        }
    }
}

const loginSuccess = () => {
    const username = authService.getUsername();
    return {
        type: LOGIN_SUCCESS,
        username
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}

export const register = (userData) => {
    return axios.post('/api/v1/users/register', { ...userData }).then(
        (res) => { return res.data },
        (err) => {
            return Promise.reject(err.response.data.errors);
        });
}

export const login = (userData) => {
    return dispatch => {
        return axios.post('/api/v1/users/auth', userData)
            .then(res => res.data)
            .then(token => {
                authService.saveToken(token);
                dispatch(loginSuccess());
            })
            .catch(({ response }) => {
                dispatch(loginFailure(response.data.errors));
            })
    }
}

export const fetchRentals = () => dispatch => {
    axiosInstance.get('/rentals').then((rentals) => {
        dispatch({ type: FETCH_RENTALS, rentals: rentals.data });
    })
}

export const fetchRentalById = (rentalId) => dispatch => {
    let rental = {};
    dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: {} });

    setTimeout(() => {
        axios.get(`/api/v1/rentals/${rentalId}`).then((rental) => {
            if (rental !== undefined && rental !== null) {
                dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: rental.data });
            }
            else
                dispatch({ type: FETCH_RENTAL_FIND_BY_ID, payload: {} });
        })

    }, 1000);

    if (rental === undefined) {
        rental = {};
    }
}


export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
        .then(res => res.data)
        .catch(({response}) => Promise.reject(response.data.errors))
  }
  