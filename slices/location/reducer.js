// slice/location/reducer.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  source: '',
  destination: '',
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setSource: (state, action) => {
      state.source = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    clearLocations: (state) => {
      state.source = '';
      state.destination = '';
    },
  },
});

export const { setSource, setDestination, clearLocations } = locationSlice.actions;
export default locationSlice.reducer;
