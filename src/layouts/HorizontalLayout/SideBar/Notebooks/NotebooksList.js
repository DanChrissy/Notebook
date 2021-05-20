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
import Dropdown from "../../../../components/Dropdown";

const NotebooksList = ({ notebooks, notebookNotes, handleNotebook, handleSelectNote, handleEditNotebok, handleRemoveNotebok}) => {
    return (
       notebooks.map((notebook,index) => {
            return (
                <Dropdown
                    key={index}
                    trigger={
                        <Notebook 
                            key={index} 
                            name={notebook?.name}
                            handleSelectNotebook={() => handleNotebook(notebook?.id)}
                            handleEditNotebok={(value) => handleEditNotebok(notebook?.id, value)}
                            handleRemoveNotebok={() => handleRemoveNotebok(notebook?.id)}
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
        })
    )
}

export default NotebooksList;

const NoteOption = ({option, onClick}) => {
    return (
        <StyledOption onClick={onClick}>
            {option}
        </StyledOption>
    )
}

const StyledOption = styled.div`
    padding: var(--space-6) var(--space-16);
    :hover {
        color: var(--color-orange-200);
    }
`;
