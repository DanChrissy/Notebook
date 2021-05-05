import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import Content from "./Content";
import SideBar from "./SideBar";
import Modal from "../../components/Modal";
import Form from "../../pages/Form";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { getBookmarks, setBookmarks } from "../../store/bookmarksStoreOLD";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../../store/notesStore";
import store from "../../store";
import { notebooksSelectors } from "../../store/notebooksStore";
import { bookmarksSelectors } from "../../store/bookmarksStore";

const HorizontalLayout = () => {
    const dispatch = useDispatch();

    const notes = notesSelectors.selectAll(store.getState());
    const notebooks = notebooksSelectors.selectAll(store.getState());
    const bookmarks = bookmarksSelectors.selectAll(store.getState());

    // console.log('Noote: ', notes);

    const modalRef = useRef();
    
    // Examples using notes:
    // Add new note: dispatch(addNote({'id': 20, 'title': 'Test'}));
    // Get notes using selectors: notesSelectors.selectAll(store.getState().testNotes)
    // Get note by id: notesSelectors.selectById(store.getState().testNotes,2)

    const [selectedNotebookId, setSelectedNotebookId] = useState(1);
    const [selectedNoteId, setSelectedNoteId] = useState();

    const [selectedNotebook, setSelectedNotebook] = useState({});
    const [selectedNote, setSelectedNote] = useState({});
    const [notebookBookmarks, setNotebookBookmarks] = useState([]);
    const [modalOpen, setMddalOpen] = useState(false);
    const [breadCrumbHistory, setBreadCrumbHistory] = useState({});
    
    useOnClickOutside(modalRef, () => setMddalOpen(false));
    console.log("Selected notebook: ", selectedNotebookId, selectedNoteId)

    useEffect(() => {
        if (breadCrumbHistory?.notebook !== selectedNotebook?.name) {
            setBreadCrumbHistory({notebook: selectedNotebook?.name})
        }
        // setBreadCrumbHistory({ notebook: selectedNotebook?.name});
    }, [selectedNotebook])

    const handleCreateNote = () => {
        setMddalOpen(true);
    }

    const handleSelectNotebook = id => {
        setSelectedNotebookId(id);
        // const bookmarks = bookmarksState.filter(bookmark => bookmark.notebook === id);
        // setNotebookBookmarks(bookmarks);

        // const notebook = notebooksState.find(item => item?.id === id);
        // setSelectedNotebook(notebook);
    }

    const handleSelectNote = id => {
        setSelectedNoteId(id);
        // const note = notesState.find(noteItem => noteItem?.id === id);
        // setSelectedNote(note);

        // const updatedBreadcrumb = {
        //     ...breadCrumbHistory,
        //     note: note?.title
        // }
        // setBreadCrumbHistory(updatedBreadcrumb);
    }

    const toggleBookMark = () => {
        console.log('Selected note: ', selectedNote);
        // const updatedBookMarks = bookmarksState.filter(bookmark => bookmark?.note.id !== selectedNote?.id)
        // dispatch(setBookmarks(updatedBookMarks))
    };

    return (
        <LayoutWrapper>
            <LayoutContainer>
                <SideBar
                    handleCreateNote={handleCreateNote}
                    handleSelectNotebook={handleSelectNotebook}
                    handleSelectNote={handleSelectNote}
                />
                <Content
                    note={selectedNoteId}
                    selectedNotebook={selectedNotebook}
                    breadCrumbHistory={breadCrumbHistory}
                    toggleBookMark={toggleBookMark}
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