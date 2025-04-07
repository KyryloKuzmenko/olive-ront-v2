import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth/authSlice";
import olivesReducer from "./olives/oliveSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        olives: olivesReducer,
    },
});