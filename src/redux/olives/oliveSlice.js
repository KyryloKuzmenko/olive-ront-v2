import { createSlice } from "@reduxjs/toolkit";

import { addOliveOnMap, fetchOlives } from "./oliveThunk";

const INITIAL_STATE = {
  olives: [],
  loading: false,
  error: null,
};

const oliveSlice = createSlice({
  name: "olives",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOlives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOlives.fulfilled, (state, action) => {
        state.loading = false;
        state.olives = action.payload;
      })
      .addCase(fetchOlives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }).addCase(addOliveOnMap.pending, (state) => {
        state.loading = true;
        state.error = null;
      }).addCase(addOliveOnMap.fulfilled, (state, action) => {
        state.loading = false;
        state.olives.push(action.payload);
      }).addCase(addOliveOnMap.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default oliveSlice.reducer;