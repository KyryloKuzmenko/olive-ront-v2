import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOlive, getOlives } from "../../services/api";

export const fetchOlives = createAsyncThunk("olives/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getOlives();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Fetching olive failed")
        }
    }
);

export const addOliveOnMap = createAsyncThunk("olives/add",
    async (coords, { rejectWithValue }) => {
        try {
            const { data } = await addOlive({
                location: {
                    type: "Point",
                    coordinates: coords,
                },
            });
            return data.data;
        } catch (error) {
            return rejectWithValue({
                message: error.response?.data?.message || "Failed to add olive",
                code: error.response?.data?.code,
            });
        }
    }
);