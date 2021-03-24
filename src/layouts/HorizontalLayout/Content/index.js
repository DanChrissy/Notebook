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


const Content = ({note = {}, breadCrumbHistory = {}, toggleBookMark, selectedNotebook}) => {
    const dispatch = useDispatch();
    const notes = useSelector(getNotes);
    const [noteValues, setNoteValues] = useState({});
    const bookmarks = useSelector(getBookmarks);


    useEffect(() => {
        const updatedNotes = notes.map(noteItem =>
            noteItem?.id === note?.id ? {...noteItem, ...noteValues} : {...noteItem}
        )
        dispatch(setNotes(updatedNotes))
    }, [noteValues])

    useEffect(() => {
        setNoteValues({});
    }, [selectedNotebook]);

    useEffect(() => {
        if (!isEmpty(note)) {
            setNoteValues(note);
        }
    }, [note])
    
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
