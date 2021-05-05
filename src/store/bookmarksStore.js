import { createSlice, createEntityAdapter, current } from "@reduxjs/toolkit";

const bookmarksAdapter = createEntityAdapter();

const BOOKMARKS_SLICE = createSlice({
    name: "bookmarks",
    initialState: bookmarksAdapter.getInitialState(),
    reducers: {
        setBookmarks: (state, action) => {
            bookmarksAdapter.setAll(state, action.payload);
        },
        addBookmark: (state, action) => {
            const nextId = current(state).ids.slice(-1)[0] + 1;
            const updatedNewBookmark = {id: nextId, ...action?.payload};

            bookmarksAdapter.addOne(state, updatedNewBookmark);
        },
        removeBookmark(state, action) {
            console.log("Remove: ", action);
            bookmarksAdapter.removeOne(state, action.payload)
        },
        resetBookmarks: () => bookmarksAdapter.getInitialState(),
    },
});

export const bookmarksSelectors = bookmarksAdapter.getSelectors(state => state.bookmarks);

export const {
    setBookmarks,
    addBookmark,
    removeBookmark,
    resetBookmarks,
} = BOOKMARKS_SLICE.actions;

export default BOOKMARKS_SLICE.reducer;
