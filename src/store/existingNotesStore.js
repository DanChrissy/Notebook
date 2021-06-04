import { createEntityAdapter, createSlice, current } from "@reduxjs/toolkit";

export const unspecifiedAdapter = createEntityAdapter();

const EXISTING_SLICE = createSlice({
    name: "unspecifiedNotes",
    initialState: unspecifiedAdapter.getInitialState(),
    reducers: {
        setExistingNotes(state, action) {
            unspecifiedAdapter.setAll(state, action.payload);
        },
        addExistingNote: (state, action) => {
            console.log('Exisitng Note: ', action.payload);
            unspecifiedAdapter.addOne(state, action.payload);
        },
        updateExistingNote: unspecifiedAdapter.updateOne,
        removeExisitngNote(state, action){
            console.log('Action: ',action.payload);
            unspecifiedAdapter.removeOne(state, action.payload)
        },
        resetUnspecified: () => unspecifiedAdapter.getInitialState(),
    },
});

export const unSpecifiedNotesSelectors = unspecifiedAdapter.getSelectors(state => state.unspecifiedNotes);

export const {
    setExistingNotes,
    addExistingNote,
    updateExistingNote,
    removeExisitngNote,
    resetUnspecified,
} = EXISTING_SLICE.actions;

export default EXISTING_SLICE.reducer;
