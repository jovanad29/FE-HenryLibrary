import {createStore, applyMiddleware} from 'redux';


import { configureStore } from "@reduxjs/toolkit";
import {composeWithDevTools} from "redux-devtools-extension"
import rootReducer from '../reducer';
import thunk from "redux-thunk";
import checkoutSlice from '../reducer/checkoutSlice';
import paymentsSlice from '../reducer/paymentsSlice'


const store = createStore(
    rootReducer, 
    composeWithDevTools(applyMiddleware(thunk)),
    // checkoutSlice.reducer,composeWithDevTools(applyMiddleware(thunk)),
    // paymentsSlice.reducer,
    // composeWithDevTools(applyMiddleware(thunk)),

)

export default store;

// export const store = configureStore({
//     reducer: {
//       rootReducer: rootReducer,
//       //users: usersReducer,
//       //profile: profileReducer,
//      // pagination: paginationReducer,
//       //history: historySlice,
//       //dashboard: dashboardSlice,
//       checkout: checkoutSlice,
//       //reviews: reviewSlice,
//       payments: paymentsSlice,
//     },
//   });