import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";
import Breadcrumbs from '../../../components/Breadcrumb';
import HoverFormatter from "../../../components/HoverFormatter";
import Note from "../../../components/Note";
import Header from "./Header";
import { Space } from "../../../components/Space";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarks } from "../../../store/bookmarksStore";
import { getNotes, setNotes } from "../../../store/notesStore";
import { getNotebooks, setNotebooks } from "../../../store/notebooksStore";


const Content = ({note = {}, breadCrumbHistory = {}, toggleBookMark, selectedNotebook}) => {
    const dispatch = useDispatch();
    const notes = useSelector(getNotes);
    const notebooks = useSelector(getNotebooks);
    const [noteValues, setNoteValues] = useState({});
    const [noteId, setNewNoteId] = useState();
    const bookmarks = useSelector(getBookmarks);

    useEffect(() => {
        setNewNoteId(notes.length + 1);
    }, []);

    useEffect(() => {
        console.log('Notes: ', notes);
        if (isEmpty(note)) {
            // Check if a notebook has been selected if so add the note to the notebook
            if (!isEmpty(selectedNotebook)) {
                const newNote = { id: noteId, ...noteValues};
                let updatedNotes = [...notes, newNote];

                let updatedNotebooks = notebooks.map(notebook => 
                    notebook?.id === selectedNotebook?.id ? {...notebook, notes: [...notebook?.notes, noteId]} : {...notebook}
                )
                const isNoteSaved = notes.filter(noteItem => noteItem?.id === noteId);
                const findNotebook = notebooks.find(notebook => notebook?.id === selectedNotebook?.id);
                const isInNotebook = findNotebook?.notes.includes(noteId);
                if(!isEmpty(isNoteSaved)) {
                    updatedNotes = handleUpdateNotes(newNote);
                }
                if(!isInNotebook) {
                    dispatch(setNotebooks(updatedNotebooks));
                }

                if(!isEmpty(noteValues)) {
                    dispatch(setNotes(updatedNotes));
                }
            }
        } else {
            const updatedNotes = handleUpdateNotes(note);
            dispatch(setNotes(updatedNotes))
        }
    }, [noteValues])

    useEffect(() => {
        setNoteValues({});
    }, [selectedNotebook]);

    useEffect(() => {
        if (!isEmpty(note)) {
            setNoteValues(note);
        }
    }, [note])

    const handleUpdateNotes = compNote => {
        const updatedNotes = notes.map(noteItem =>
            noteItem?.id === compNote?.id ? {...noteItem, ...noteValues} : {...noteItem}
        )
        return updatedNotes
    };

    const handleUpdateNoteValues = (e, name) => {
        const { value = ""} = e?.target;
        setNoteValues({
            ...noteValues,
            [name]: value
        })
    }

    const bookmarkObj = bookmarks.find(bookmark => bookmark?.note?.id === note?.id) || {};

    return (
        <ContentWrapper>
            <ContentContainer>
                <Header
                    breadCrumbHistory={breadCrumbHistory}
                    isBookmark={!isEmpty(bookmarkObj)}
                    toggleBookMark={toggleBookMark}
                />
                <Space height="var(--space-40)"/>
                <Note
                    noteValues={noteValues}
                    handleUpdateNoteValues={handleUpdateNoteValues}
                />
            </ContentContainer>
        </ContentWrapper>
    )
}

export default Content;

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
