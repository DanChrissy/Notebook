import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {isEmpty} from "lodash";
import styled from "styled-components";
import Notebook from "../../../../components/Notebook";
import { getNotebooks } from "../../../../store/notebooksStore";
import { getNotes } from "../../../../store/notesStore";

const Notebooks = ({ notebooks = [], handleSelectNotebook, handleSelectNote}) => {
    const [selectedNotebook, setSelectedNotebook] = useState();
    const [notebookNotes, setNotebookNNotes] = useState([]);
    const notebooksData = useSelector(getNotebooks);
    const notes = useSelector(getNotes);

    const handleNotebook = id => {
        handleSelectNotebook(id);
        setSelectedNotebook(id);
    }

    useEffect(() => {
        let updatedNotes = [];

        const findNotes = notebooksData.find(notebook => notebook?.id === selectedNotebook)?.notes || [];
        findNotes.map(noteId => {
            const note = notes.find(noteItem => noteItem?.id === noteId );
            !isEmpty(note) && updatedNotes.push(note);
        })

        setNotebookNNotes(updatedNotes)

    }, [selectedNotebook])
    
    return (
        <NotebooksWrapper>
            <NotebooksContainer>
                {notebooks.map((notebook,index) => {
                    return (
                        <Notebook 
                            key={index} 
                            name={notebook?.name}
                            handleSelectNotebook={() => handleNotebook(notebook?.id)}
                            isOpen={selectedNotebook === notebook?.id}
                            options={notebookNotes}
                            handleClickOption={handleSelectNote}
                        />
                    )
                })}
            </NotebooksContainer>
        </NotebooksWrapper>
    )
}

export default Notebooks;

const NotebooksWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const NotebooksContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
