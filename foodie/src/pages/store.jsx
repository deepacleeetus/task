 import { configureStore } from "@reduxjs/toolkit"  
 import cartReducer from "./cart";
 import searchReducer from "./search";
export const store = configureStore(
    {
        reducer : {
            cart:cartReducer,
            search: searchReducer,
        },
    }
)