import { configureStore } from "@reduxjs/toolkit";
import heroeReducer from "../features/hero/heroSlice";
import authReducer from "../features/auth/authSlice";
import favReducer from "../features/favs/favSlice"

export const store = configureStore({
    reducer:{
        heroes: heroeReducer,
        auth: authReducer,
        fav:favReducer
    }
})



