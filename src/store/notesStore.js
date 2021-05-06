import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import PageLoader from "./helpers";

export const notesAdapter = createEntityAdapter();

const NOTES_SLICE = createSlice({
    name: "notes",
    initialState: notesAdapter.getInitialState(),
    reducers: {
        setNotes(state, action) {
            notesAdapter.setAll(state, action.payload);
        },
        addNote: notesAdapter.addOne,
        updateNote(state, update) {
            notesAdapter.updateOne(state, update);
        },
        // updateNote: notesAdapter.updateOne,
        removeNote(state, action){
            notesAdapter.removeOne(state, action.payload)
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
} = NOTES_SLICE.actions;

export default NOTES_SLICE.reducer;
