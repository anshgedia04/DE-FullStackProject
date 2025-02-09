import { configureStore } from "@reduxjs/toolkit";
import  CartSlice  from "./Slices/CartSlice";
import authSlice from "./Slices/authSlice";

export const store = configureStore({
    reducer:{
        cart: CartSlice,
        auth: authSlice
    }
});