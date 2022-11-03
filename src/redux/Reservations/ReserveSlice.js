import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';

export const createReserve = createAsyncThunk(
  'reserve/createReserve',
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('loginToken'),
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState = {
  reservations: [],
  status: 'idle',
  error: null,
  addFromNav: false,
};

const reserveSlice = createSlice({
  name: 'reserve',
  initialState,
  reducers: {
    addFromNav(state, action) {
      const newState = { ...current(state) };
      newState.addFromNav = action.payload;
      return newState;
    },
    isError(state, action) {
      const newState = { ...current(state) };
      newState.error = action.payload;
      return newState;
    }
  },
  extraReducers: {
    [createReserve.fulfilled]: (state, action) => {
      console.log(current(state));
      console.log(action.payload);
      let { reservations } = current(state);
      const { reservation } = action.payload;
      reservations = [...reservations, reservation];
      console.log(reservations);
      console.log(reservation);
      console.log(action.payload);
    },
  },
});

export default reserveSlice.reducer;
export const { addFromNav, isError } = reserveSlice.actions;
