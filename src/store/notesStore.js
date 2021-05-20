import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import PageLoader from "./helpers";

export const notesAdapter = createEntityAdapter();

const NOTES_SLICE = createSlice({
    name: "notes",
    initialState: notesAdapter.getInitialState({loading: false}),
    reducers: {
        setNotes(state, action) {
            notesAdapter.setAll(state, action.payload);
            state.loading = false;
        },
        addNote: notesAdapter.addOne,
        updateNote(state, update) {
            notesAdapter.updateOne(state, update);
        },
        // updateNote: notesAdapter.updateOne,
        removeNote(state, action){
            notesAdapter.removeOne(state, action.payload)
        },
        notesLoading: (state, action) => {
            if (action.payload === true) state.loading = action.payload;
        },
        resetNotes: () => notesAdapter.getInitialState(),
    },
});

export const notesSelectors = notesAdapter.getSelectors(state => state.notes);

export const {
    setNotes,
    resetNotes,
    removeNote,
    updateNote,
    addNote,
    notesLoading
} = NOTES_SLICE.actions;

export default NOTES_SLICE.reducer;
