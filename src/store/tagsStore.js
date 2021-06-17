import { createEntityAdapter, createSlice, current } from "@reduxjs/toolkit";

export const tagssAdapter = createEntityAdapter();

const TAGS_SLICE = createSlice({
    name: "tags",
    initialState: tagssAdapter.getInitialState(),
    reducers: {
        setTags(state, action) {
            tagssAdapter.setAll(state, action.payload);
        },
        addTag: (state, action) => {
            const nextId = current(state).ids.slice(-1)[0] + 1;
            const updatedNewTag = {id: nextId, ...action?.payload};
            console.log("Notebook: ", updatedNewTag);
            tagssAdapter.addOne(state, updatedNewTag);
        },
        updateTag: tagssAdapter.updateOne,
        removeTag(state, action){
            tagssAdapter.removeOne(state, action.payload)
        },
        resetTags: () => tagssAdapter.getInitialState(),
    },
});

export const tagsSelectors = tagssAdapter.getSelectors(state => state.tags);

export const {
    setTags,
    resetTags,
    removeTag,
    updateTag,
    addTag,
} = TAGS_SLICE.actions;

export default TAGS_SLICE.reducer;
