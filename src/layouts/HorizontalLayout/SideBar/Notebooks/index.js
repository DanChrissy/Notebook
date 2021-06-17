import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {isEmpty} from "lodash";
import styled from "styled-components";
import Notebook from "../../../../components/Notebook";
// import { getNotebooks } from "../../../../store/notebooksStoreOLD";
// import { getNotes } from "../../../../store/notesStoreOLD";
import { notebooksSelectors, removeNotebook, updateNotebook } from "../../../../store/notebooksStore";
import store from "../../../../store";
import { notesSelectors } from "../../../../store/notesStore";
import Dropdown, {Option} from "../../../../components/Dropdown";
import NotebooksList from "./NotebooksList";
import { setExistingNotes, unSpecifiedNotesSelectors } from "../../../../store/existingNotesStore";

const Notebooks = ({ handleSelectNotebook, handleSelectNote}) => {
    const dispatch = useDispatch();
    const notebooks = notebooksSelectors.selectAll(store.getState());

    const reverseNotebooks = [...notebooks].reverse();
    const notes = notesSelectors.selectAll(store.getState());
    const exisitngNotes = unSpecifiedNotesSelectors.selectAll(store.getState());

    const [selectedNotebook, setSelectedNotebook] = useState();
    const [notebookNotes, setNotebookNNotes] = useState([]);
    const [unspecifiedNotes, setUnSpecifiedNotes] = useState([]);

    // TODO: Create unspecifed notebook for notes not associated with a particular note
    console.log('Unspecified: ', exisitngNotes, notes);
    useEffect(() => {
        console.log("Update");
        let notebookNotes = [];

        const notebookObj = notebooksSelectors.selectById(store.getState(), selectedNotebook);
        const notebookObjNotes = notebookObj?.notes || [];

        notebookObjNotes.map((noteId) => {
            return (
                notebookNotes.push(notesSelectors.selectById(store.getState(), noteId))
            );
        })

        setNotebookNNotes(notebookNotes)

    }, [selectedNotebook, notes])

    useEffect(() => {
        const noteObjArray = [];
        exisitngNotes.map(noteId => {
            return (
                noteObjArray.push(notesSelectors.selectById(store.getState(), noteId?.id))
            )
        })
        setUnSpecifiedNotes([...noteObjArray]);
    }, [exisitngNotes, notes])

    useEffect(() => {
        console.log("Notebooks: ", notebooks);
    }, [notebooks]);

    const handleNotebook = id => {
        handleSelectNotebook(id);
        setSelectedNotebook(id);
    }

    const handleEditNotebok = (id, value) => {
        console.log('Edit id:', id, value);
        const updatedNotebook = {id: id, changes: { name: value}};
        dispatch(updateNotebook(updatedNotebook));
    }

    const handleRemoveNotebok = id => {
        console.log('Remove id:', id);
        
        const notebookObj = notebooksSelectors.selectById(store.getState(), id);
        const notebookObjNotes = notebookObj?.notes || []; 

        const updateNoteObj = notebookObjNotes.map(noteid => { return ({id: noteid})});

        console.log('updateNoteObj: ', updateNoteObj);
        
        // Add notes to unspecified 'folder'
        dispatch(setExistingNotes([...updateNoteObj]))
        // Removes the notebook without removing the notes
        dispatch(removeNotebook(id));

        // Remove the notebook and all the notes associated with notes
        // Get notes via notes id in notebook
        // Use remove many selector in notes
    }

    console.log('Notebook notes: ', notebookNotes);
    
    return (
        <NotebooksWrapper>
            <NotebooksContainer>

                <NotebookView
                    key={Math.random() + new Date().getTime()}
                    name="Unspecified Notes"
                    handleSelectNote={handleSelectNote}
                    notebookNotes={unspecifiedNotes}
                    hasActions={false}
                />
                {reverseNotebooks.map((notebook,index) => {
                    return (
                        <NotebookView
                            key={index * Math.random() + new Date().getTime()}
                            name={notebook?.name}
                            handleEditNotebok={(value) => handleEditNotebok(notebook?.id, value)}
                            handleRemoveNotebok={() => handleRemoveNotebok(notebook?.id)}
                            handleSelectNote={handleSelectNote}
                            handleSelectNotebook={() => handleNotebook(notebook?.id)}
                            notebookNotes={notebookNotes}
                        />
                    )
                })}
    
            </NotebooksContainer>
        </NotebooksWrapper>
    )
}

export default Notebooks;

const NotebookView = ({name, handleSelectNotebook, handleEditNotebok, handleRemoveNotebok, notebookNotes, handleSelectNote, hasActions}) => {
    return (
        <Dropdown
            trigger={
                <Notebook 
                    actions={hasActions}
                    name={name}
                    handleSelectNotebook={handleSelectNotebook}
                    handleEditNotebok={handleEditNotebok}
                    handleRemoveNotebok={handleRemoveNotebok}
                />
            }
        >
            {
                notebookNotes.length > 0 ? notebookNotes.map((note, index) => {
                return (
                    <NoteOption
                        key={index}
                        option={note?.title || ''}
                        onClick={() => handleSelectNote(note?.id)}
                    />
                )
                }) : null
            }
        </Dropdown>
    )
}

const NoteOption = ({option, onClick}) => {
    return (
        <StyledOption onClick={onClick}>
            {option}
        </StyledOption>
    )
}

const NotebooksWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const NotebooksContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledOption = styled.div`
    padding: var(--space-6) var(--space-16);
    :hover {
        color: var(--color-orange-200);
    }
`;
