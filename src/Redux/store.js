import { configureStore } from "@reduxjs/toolkit";
import { getCountriesReducer } from "./getCountriesData";
import { getCountryReducer } from "./countryDetails";

export const store = configureStore({
    reducer: {
        countries: getCountriesReducer,
        country: getCountryReducer
    },
    middleware: (getDefaultMiddleware) => {
        const middleware = getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check in development
        });
        return middleware;
    },
});
