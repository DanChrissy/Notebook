import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

// Reducers
import notebooksReducer from './notebooksStore';
import bookmarksRedurer from './bookmarksStore';
import notesReducer from './notesStore';
import unspecifiedNotesReducer from './existingNotesStore';
import tagsReducer from './tagsStore';

const rootReducer = combineReducers({
    notebooks: notebooksReducer,
    bookmarks: bookmarksRedurer,
    notes: notesReducer,
    unspecifiedNotes: unspecifiedNotesReducer,
    tags: tagsReducer

})

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], },
        immutableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };

export default store;