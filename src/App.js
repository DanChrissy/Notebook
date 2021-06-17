import logo from './logo.svg';
import './App.css';
import './index.css';
import HorizontalLayout from './layouts/HorizontalLayout';
import { setNotebooks } from './store/notebooksStore';
import { setBookmarks } from './store/bookmarksStore';
import { notesSelectors, setNotes, notesLoading } from './store/notesStore';
import { useDispatch } from 'react-redux';
import { useEffect, useLayoutEffect } from 'react';

import notebooksData from './mockData/notebooksData.json';
import notesData from './mockData/notes.json';
import bookmarksData from './mockData/bookmarks.json';
import tagsData from './mockData/tags.json';
import store from './store';
import { setTags } from './store/tagsStore';

function App() {
  // Load data into store
  const dispatch = useDispatch();
  const notebooks = notebooksData.notebooks;
  const bookmarks = bookmarksData.bookmarks;
  const notes = notesData.notes;
  const tags = tagsData.tags;

  useEffect(() => {
    dispatch(setBookmarks(bookmarks));
    dispatch(setNotebooks(notebooks));
    dispatch(setNotes(notes));
    dispatch(setTags(tags));
  },[]);

  const shouldRender = store.getState().notes.notes.length > 0;
  
  return (
    <div className="App">
      {shouldRender && <HorizontalLayout/>}
    </div>
  );
}
const Data = () => {
  const notes = notesSelectors.selectAll(store.getState());
  console.log('Notes: ', notes);
  return (
    <div>DATA</div>
  )
}
export default App;
