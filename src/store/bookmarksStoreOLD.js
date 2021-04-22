import { createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = {
    bookmarks: [],
};

const BOOKMARKS_SLICE = createSlice({
    name: "bookmarks",
    initialState: DEFAULT_STATE,
    reducers: {
        setBookmarks: (state, action) => {
            state.bookmarks = action.payload;
        },
        resetBookmarks: () => DEFAULT_STATE,
    },
});

export const getBookmarks = ({ bookmarks: state }) => state.bookmarks;

export const {
    setBookmarks,
    resetBookmarks,
} = BOOKMARKS_SLICE.actions;

export default BOOKMARKS_SLICE.reducer;
