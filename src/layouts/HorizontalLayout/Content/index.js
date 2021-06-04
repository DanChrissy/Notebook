import React, {useEffect, useState, useContext} from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";
import Breadcrumbs from '../../../components/Breadcrumb';
import HoverFormatter from "../../../components/HoverFormatter";
import Note from "../../../components/Note";
import Header from "./Header";
import { Space } from "../../../components/Space";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../../../store/bookmarksStoreOLD";
import { getNotes, setNotes } from "../../../store/notesStoreOLD";
import { getNotebooks, setNotebooks } from "../../../store/notebooksStoreOLD";
import { addBookmark, bookmarksSelectors, loadBookmarks, removeBookmark } from "../../../store/bookmarksStore";
import store from "../../../store";
import { notebooksSelectors, updateNotebook } from "../../../store/notebooksStore";
import { notesSelectors, removeNote } from "../../../store/notesStore";
import {PageContext} from '../../../contexts/PageContext';


const Content = ({note, setSelectedNoteId, notebook}) => {
    const dispatch = useDispatch();

    const bookmarks = bookmarksSelectors.selectAll(store.getState());
    const notebooks = notebooksSelectors.selectAll(store.getState());
    const { pageState, setPageState } = useContext(PageContext);


    const getNotebook = (noteId) => notebooks.find(notebook => (notebook?.notes || []).includes(noteId));
    const getBreadCrumbHistory = () => {
        const noteObj = notesSelectors.selectById(store.getState(), note);
        const notebookObj = note && getNotebook(note);
        // console.log("Breadcrumb: ", noteObj, notebookObj);
        return {notebook: notebookObj?.name || '', note: noteObj?.title || ''};
    }

    const toggleBookMark = () => {
        const bookmark = getIsBookmark(note);
        // console.log("Toogle bookmark:", bookmark);
        if (bookmark) {
            // Remove bookmark
            dispatch(removeBookmark(bookmark?.id));
        } else {
            // Add to bookmark list with obj: {note: noteId, notebook: notebookId}
            dispatch(addBookmark({note, notebook: getNotebook(note)?.id}))
        }
        setPageState({...pageState, loading: true});
    };

    const handleRemoveNote = () => {
        setSelectedNoteId();
        dispatch(removeNote(note));
        const selectedNotebook = getNotebook(note);
        const selectedBookmark = bookmarks.find(bookmark => bookmark.note === note);
        const filterNotebookNotes = selectedNotebook.notes.filter(noteId => note !== noteId);

       selectedBookmark && dispatch(removeBookmark(selectedBookmark.id));
       dispatch(updateNotebook({id: selectedNotebook.id, changes: {notes: filterNotebookNotes}}));
    }

    const breadCrumbHistory = getBreadCrumbHistory();
    
    return (
        <ContentWrapper>
            <ContentContainer>
                <Header
                    breadCrumbHistory={breadCrumbHistory}
                    // isBookmark={!isEmpty(bookmarkObj)}
                    isBookmark={!!getIsBookmark(note)}
                    toggleBookMark={toggleBookMark}
                    onRemoveNote={handleRemoveNote}
                />
                <Space height="var(--space-40)"/>
                <Note
                    note={note}
                />
            </ContentContainer>
        </ContentWrapper>
    )
}

export default Content;

export const getIsBookmark = (noteId) => bookmarksSelectors.selectAll(store.getState()).find(bookmark => bookmark?.note === noteId);

const ContentWrapper = styled.div`
    flex:1;
    height: 100%;
    min-width: 40rem;
`;

const ContentContainer = styled.div`
    height: 100%;
    width: inherit;
    background-color: white;
    padding-left: var(--space-40);
    padding-right: var(--space-40);
    padding-top: 2.5rem;
`;
