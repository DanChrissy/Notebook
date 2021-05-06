import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {isEmpty} from "lodash";
import styled from "styled-components";
import Notebook from "../../../../components/Notebook";
// import { getNotebooks } from "../../../../store/notebooksStoreOLD";
// import { getNotes } from "../../../../store/notesStoreOLD";
import { notebooksSelectors } from "../../../../store/notebooksStore";
import store from "../../../../store";
import { notesSelectors } from "../../../../store/notesStore";
import Dropdown, {Option} from "../../../../components/Dropdown";

const Notebooks = ({ handleSelectNotebook, handleSelectNote}) => {
    const notebooks = notebooksSelectors.selectAll(store.getState());
    const notes = notesSelectors.selectAll(store.getState());

    // console.log('Notes:', notes);

    const [selectedNotebook, setSelectedNotebook] = useState();
    const [notebookNotes, setNotebookNNotes] = useState([]);

    // const notebooksData = useSelector(getNotebooks);
    // const notes = useSelector(getNotes);

    const handleNotebook = id => {
        handleSelectNotebook(id);
        setSelectedNotebook(id);
    }

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
    
    return (
        <NotebooksWrapper>
            <NotebooksContainer>
                {notebooks.map((notebook,index) => {
                    return (
                        <Dropdown
                            key={index}
                            trigger={
                                <Notebook 
                                    key={index} 
                                    name={notebook?.name}
                                    handleSelectNotebook={() => handleNotebook(notebook?.id)}
                                />
                            }
                        >
                            {notebookNotes.map((note, index) => {
                                return (
                                    <NoteOption
                                        key={index}
                                        option={note.title}
                                        onClick={() => handleSelectNote(note?.id)}
                                    />
                                )
                            })}
                        </Dropdown>
                        
                    )
                })}
            </NotebooksContainer>
        </NotebooksWrapper>
    )
}

export default Notebooks;

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
