import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountriesData = createAsyncThunk('countries', async function () {
    const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
    console.log(data);
    return data;
});

export const getCountriesSlice = createSlice({
    name: 'countries',
    initialState: { countries: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCountriesData.fulfilled, (state, action) => {
            state.countries = action.payload;
        });
    },
});

export const getCountriesReducer = getCountriesSlice.reducer;
