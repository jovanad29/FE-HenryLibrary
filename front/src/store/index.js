import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from '../reducer';
import thunk from "redux-thunk";
import checkoutSlice from '../reducer/checkoutSlice';


const store = createStore(
    rootReducer, checkoutSlice.reducer,
    composeWithDevTools(applyMiddleware(thunk)),
)

export default store;

