import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCountryDetails = createAsyncThunk('country', async function (name) {
    const { data } = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    console.log(data[0]);
    return data[0];
});

export const getCountrySlice = createSlice({
    name: 'country',
    initialState: { country: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCountryDetails.fulfilled, (state, action) => {
            state.country = action.payload;
        });
    },
});

export const getCountryReducer = getCountrySlice.reducer;
