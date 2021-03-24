import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
    notes: [],
};

const NOTES_SLICE = createSlice({
    name: "notes",
    initialState: DEFAULT_STATE,
    reducers: {
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        resetNotes: () => DEFAULT_STATE,
    },
});

export const getNotes = ({ notes: state }) => state.notes;

export const {
    setNotes,
    resetNotes,
} = NOTES_SLICE.actions;

export default NOTES_SLICE.reducer;
