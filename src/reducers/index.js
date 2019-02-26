
import { rentalReducer, rentalByIdReducer } from './rental-reducer';
import {authReducer} from './auth-reducer'
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer as FormReducer } from 'redux-form';

const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));
export const Init = () => {
    const reducer = combineReducers({
        rentals: rentalReducer,
        rental: rentalByIdReducer,
        form: FormReducer,
        auth: authReducer
    });
    const store = createStore(reducer, enhancer);
    return store;
}
