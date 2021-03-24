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
import { getBookmarks, setBookmarks } from "../../store/bookmarksStore";
import { useDispatch, useSelector } from "react-redux";


const HorizontalLayout = () => {
    const dispatch = useDispatch();
    const notesState = useSelector(getNotes);
    const notebooksState = useSelector(getNotebooks);
    const bookmarksState = useSelector(getBookmarks);

    const modalRef = useRef();

    const [selectedNotebook, setSelectedNotebook] = useState({});
    const [selectedNote, setSelectedNote] = useState({});
    const [notebookBookmarks, setNotebookBookmarks] = useState([]);
    const [modalOpen, setMddalOpen] = useState(false);
    const [breadCrumbHistory, setBreadCrumbHistory] = useState({});
    
    useOnClickOutside(modalRef, () => setMddalOpen(false));

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
        const bookmarks = bookmarksState.filter(bookmark => bookmark.notebook === id);
        setNotebookBookmarks(bookmarks);

        const notebook = notebooksState.find(item => item?.id === id);
        setSelectedNotebook(notebook);
        // const newBreadCrumb = breadCrumbHistory?.notebook === notebook.name;
        // // console.log('Breadcrumb histor: ', breadCrumbHistory?.notebook, notebook.name,  breadCrumbHistory?.notebook === notebook.name );
        // const updatedBreadcrumb = newBreadCrumb ? { notebook: notebook?.name } : {...breadCrumbHistory, notebook: notebook?.name}
        // setBreadCrumbHistory(updatedBreadcrumb);
    }

    const handleSelectNote = id => {
        const note = notesState.find(noteItem => noteItem?.id === id);
        setSelectedNote(note);

        const updatedBreadcrumb = {
            ...breadCrumbHistory,
            note: note?.title
        }
        setBreadCrumbHistory(updatedBreadcrumb);
    }

    const handleSelectBookmark = id => {
        handleSelectNote(id);
    }

    const toggleBookMark = () => {
        console.log('Selected note: ', selectedNote);
        const updatedBookMarks = bookmarksState.filter(bookmark => bookmark?.note.id !== selectedNote?.id)
        dispatch(setBookmarks(updatedBookMarks))
    };

    return (
        <LayoutWrapper>
            <LayoutContainer>
                <SideBar
                    handleCreateNote={handleCreateNote}
                    handleSelectNotebook={handleSelectNotebook}
                    handleSelectBookmark={handleSelectBookmark}
                    notebooks={notebooksState}
                    bookmarks={notebookBookmarks}
                />
                <Content
                    note={selectedNote}
                    breadCrumbHistory={breadCrumbHistory}
                    toggleBookMark={toggleBookMark}
                    selectedNotebook={selectedNotebook}
                    
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