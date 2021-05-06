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
import { notebooksSelectors } from "../../../store/notebooksStore";
import { notesSelectors } from "../../../store/notesStore";
import {PageContext} from '../../../contexts/PageContext';


const Content = ({note = {}}) => {
    const dispatch = useDispatch();
    const [noteValues, setNoteValues] = useState({});
    const [noteId, setNewNoteId] = useState();
    const bookmarks = bookmarksSelectors.selectAll(store.getState());
    const notebooks = notebooksSelectors.selectAll(store.getState());
    const notes = notesSelectors.selectAll(store.getState());
    const { pageState, setPageState } = useContext(PageContext);

    // console.log("Page state: ", pageState)

    // useEffect(() => {
    //     setNewNoteId(notes.length + 1);
    // }, []);

    // useEffect(() => {
    //     // console.log('Notes: ', notes);
    //     if (isEmpty(note)) {
    //         // Check if a notebook has been selected if so add the note to the notebook
    //         if (!isEmpty(selectedNotebook)) {
    //             const newNote = { id: noteId, ...noteValues};
    //             let updatedNotes = [...notes, newNote];

    //             let updatedNotebooks = notebooks.map(notebook => 
    //                 notebook?.id === selectedNotebook?.id ? {...notebook, notes: [...notebook?.notes, noteId]} : {...notebook}
    //             )
    //             const isNoteSaved = notes.filter(noteItem => noteItem?.id === noteId);
    //             const findNotebook = notebooks.find(notebook => notebook?.id === selectedNotebook?.id);
    //             const isInNotebook = findNotebook?.notes.includes(noteId);
    //             if(!isEmpty(isNoteSaved)) {
    //                 updatedNotes = handleUpdateNotes(newNote);
    //             }
    //             if(!isInNotebook) {
    //                 dispatch(setNotebooks(updatedNotebooks));
    //             }

    //             if(!isEmpty(noteValues)) {
    //                 dispatch(setNotes(updatedNotes));
    //             }
    //         }
    //     } else {
    //         const updatedNotes = handleUpdateNotes(note);
    //         dispatch(setNotes(updatedNotes))
    //     }
    // }, [noteValues])

    // useEffect(() => {
    //     setNoteValues({});
    // }, [selectedNotebook]);

    // useEffect(() => {
    //     if (!isEmpty(note)) {
    //         setNoteValues(note);
    //     }
    // }, [note])

    // const handleUpdateNotes = compNote => {
    //     const updatedNotes = notes.map(noteItem =>
    //         noteItem?.id === compNote?.id ? {...noteItem, ...noteValues} : {...noteItem}
    //     )
    //     return updatedNotes
    // };

    // const handleUpdateNoteValues = (e, name) => {
    //     const { value = ""} = e?.target;
    //     setNoteValues({
    //         ...noteValues,
    //         [name]: value
    //     })
    // }
    const getNotebook = (noteId) => notebooks.find(notebook => notebook?.notes.includes(noteId));
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

    const breadCrumbHistory = getBreadCrumbHistory();
    
    return (
        <ContentWrapper>
            <ContentContainer>
                <Header
                    breadCrumbHistory={breadCrumbHistory}
                    // isBookmark={!isEmpty(bookmarkObj)}
                    isBookmark={!!getIsBookmark(note)}
                    toggleBookMark={toggleBookMark}
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
