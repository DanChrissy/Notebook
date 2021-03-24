import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import Content from "./Content";
import SideBar from "./SideBar";
import Modal from "../../components/Modal";
import Form from "../../pages/Form";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import mockData from '../../mockData/notebooks.json';
import { getNotes } from "../../store/notesStore";
import { getNotebooks } from "../../store/notebooksStore";
import { getBookmarks } from "../../store/bookmarksStore";
import { useSelector } from "react-redux";


const HorizontalLayout = () => {

    const notesState = useSelector(getNotes);
    const notebooksState = useSelector(getNotebooks);
    const bookmarksState = useSelector(getBookmarks);

    const modalRef = useRef();
    const [selectedNote, setSelectedNote] = useState({});
    const [notebookBookmarks, setNotebookBookmarks] = useState([]);
    const [modalOpen, setMddalOpen] = useState(false);
    useOnClickOutside(modalRef, () => setMddalOpen(false));

    const handleCreateNote = () => {
        setMddalOpen(true);
    }

    const handleSelectNotebook = id => {
        const bookmarks = bookmarksState.filter(bookmark => bookmark.notebook === id);
        setNotebookBookmarks(bookmarks);
    }

    const handleSelectNote = id => {
        const note = notesState.find(noteItem => noteItem?.id === id);
        setSelectedNote(note);
    }
    
    // console.log('Notes:', notesState);
    // console.log('Notebooks:', notebooksState);
    // console.log('Bookmarks:', bookmarksState);

    return (
        <LayoutWrapper>
            <LayoutContainer>
                <SideBar
                    handleCreateNote={handleCreateNote}
                    handleSelectNotebook={handleSelectNotebook}
                    handleSelectNote={handleSelectNote}
                    notebooks={notebooksState}
                    bookmarks={notebookBookmarks}
                />
                <Content
                    note={selectedNote}
                />
                {modalOpen && 
                    <Modal>
                        <div ref={modalRef}>
                            <Form/>
                        </div>
                    </Modal>
                }
            </LayoutContainer>
        </LayoutWrapper>
    )
}

export default HorizontalLayout;

const LayoutWrapper = styled.div`
    height: 100vh;
    width: 100vw;
`;

const LayoutContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: row;

    height: 100%;
    width: 100%;
`