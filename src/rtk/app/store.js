import {  configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import productReducer from "../reducers/productReducer";
import cartReducer from "../reducers/cartReducer";
import storesReducer from "../reducers/storesReducer";
import orderReducer from "../reducers/orderReducer";
import checkoutReducer from "../reducers/checkoutReducer";
import userOrderReducer from "../reducers/userOrderReducer";

export const store = configureStore({
    reducer: {
      userState: userReducer,
      products: productReducer,
      cart: cartReducer,
      stores: storesReducer,
      orders: orderReducer,
      checkout: checkoutReducer,
      userOrders: userOrderReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
