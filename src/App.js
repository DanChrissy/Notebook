import logo from './logo.svg';
import './App.css';
import './index.css';
import HorizontalLayout from './layouts/HorizontalLayout';
import { setNotebooks } from './store/notebooksStore';
import { setBookmarks } from './store/bookmarksStore';
import { notesSelectors, setNotes } from './store/notesStore';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import notebooksData from './mockData/notebooksData.json';
import notesData from './mockData/notes.json';
import bookmarksData from './mockData/bookmarks.json';
import store from './store';

function App() {
  // Load data into store
  const dispatch = useDispatch();
  const notebooks = notebooksData.notebooks;
  const bookmarks = bookmarksData.bookmarks;
  const notes = notesData.notes;

  useEffect(() => {
    dispatch(setBookmarks(bookmarks));
    dispatch(setNotebooks(notebooks));
    dispatch(setNotes(notes));
  }, []);
  return (
    <div className="App">
      <HorizontalLayout/>
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
