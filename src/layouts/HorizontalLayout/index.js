import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components';
import Content from "./Content";
import SideBar from "./SideBar";
import Modal from "../../components/Modal";
import Form from "../../pages/Form";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {PageContext} from '../../contexts/PageContext';
import { getBookmarks, setBookmarks } from "../../store/bookmarksStoreOLD";
import { useDispatch, useSelector } from "react-redux";
import { notesSelectors } from "../../store/notesStore";
import store from "../../store";
import { addNotebook, notebooksSelectors } from "../../store/notebooksStore";
import { bookmarksSelectors } from "../../store/bookmarksStore";

const HorizontalLayout = () => {
    const dispatch = useDispatch();

    const notes = notesSelectors.selectAll(store.getState());
    // const notebooks = notebooksSelectors.selectAll(store.getState());
    // const bookmarks = bookmarksSelectors.selectAll(store.getState());

    useEffect(() => {
        // console.log('Notes: ', notes)
    }, [notes])
    const modalRef = useRef();
    
    // Examples using notes:
    // Add new note: dispatch(addNote({'id': 20, 'title': 'Test'}));
    // Get notes using selectors: notesSelectors.selectAll(store.getState().testNotes)
    // Get note by id: notesSelectors.selectById(store.getState().testNotes,2)

    const [pageState, setPageState] = useState({});

    const [selectedNotebookId, setSelectedNotebookId] = useState(1);
    const [selectedNoteId, setSelectedNoteId] = useState();

    const [modalOpen, setMddalOpen] = useState(false);
    const [creationModalOpen, setOpenCreationModal] = useState(false);
    
    useOnClickOutside(modalRef, () => setMddalOpen(false));
    const initialNotes = notebooksSelectors.selectById(store.getState(), 1)?.notes || [];
    const initialNote = initialNotes[0];

    useEffect(() => {
        // On initial open set the note seen to the first note in the first notebook;
        setSelectedNotebookId(1);
        setSelectedNoteId(initialNote);
    }, [])

    const handleCreateNote = () => {
        // setMddalOpen(true);
        // setSelectedNoteId();
    }

    const handleSelectNotebook = id => {
        setSelectedNotebookId(id);
    }

    const handleSelectNote = id => {
        setSelectedNoteId(id);
    }

    const handleOpenCreationOption = () => {
        // setOpenCreationModal(true);
        dispatch(addNotebook({name: 'New Notebook'}))
        setPageState({...pageState, loading: true});
    };

    return (
        <PageContext.Provider value={{pageState, setPageState}}>
            <LayoutWrapper>
                <LayoutContainer>
                    <SideBar
                        handleCreateNote={handleCreateNote}
                        handleSelectNotebook={handleSelectNotebook}
                        handleSelectNote={handleSelectNote}
                        handleOpenCreationOption={handleOpenCreationOption}
                    />
                    <Content
                        note={selectedNoteId}
                    />
                    {(modalOpen || creationModalOpen) && 
                        <Modal>
                            <div ref={modalRef}>
                                <Form/>
                            </div>
                        </Modal>
                    }
                </LayoutContainer>
            </LayoutWrapper>
        </PageContext.Provider>
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