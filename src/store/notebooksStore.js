import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
    notebooks: [],
};

const NOTEBOOKS_SLICE = createSlice({
    name: "notebooks",
    initialState: DEFAULT_STATE,
    reducers: {
        setNotebooks: (state, action) => {
            state.notebooks = action.payload;
        },
        resetNotebooks: () => DEFAULT_STATE,
    },
});

export const getNotebooks = ({ notebooks: state }) => state.notebooks;

export const {
    setNotebooks,
    resetNotebooks,
} = NOTEBOOKS_SLICE.actions;

export default NOTEBOOKS_SLICE.reducer;
