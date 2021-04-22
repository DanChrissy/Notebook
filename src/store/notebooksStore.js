import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const notebookssAdapter = createEntityAdapter();

const NOTEBOOKS_SLICE = createSlice({
    name: "notebooks",
    initialState: notebookssAdapter.getInitialState(),
    reducers: {
        setNotebooks(state, action) {
            notebookssAdapter.setAll(state, action.payload);
        },
        addNotebook: notebookssAdapter.addOne,
        updateNotebook: notebookssAdapter.updateOne,
        removeNotebook(state, action){
            notebookssAdapter.removeOne(state, action.payload)
        },
        resetNotebooks: () => notebookssAdapter.getInitialState(),
    },
});

export const notebooksSelectors = notebookssAdapter.getSelectors(state => state.notebooks);

export const {
    setNotebooks,
    resetNotebooks,
    removeNotebook,
    updateNotebook,
    addNotebook,
} = NOTEBOOKS_SLICE.actions;

export default NOTEBOOKS_SLICE.reducer;
