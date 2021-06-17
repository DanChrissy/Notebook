import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, {  } from "styled-components";
import { ReactComponent as Arrow } from  '../../../../../assets/svg/down-arrow.svg';
import Dropdown from '../../../../../components/Dropdown';
import ListItem from '../../../../../components/ListItem';

import store from "../../../../../store";
import { notebooksSelectors, removeNotebook, updateNotebook } from "../../../../../store/notebooksStore";
import { addExistingNote, unSpecifiedNotesSelectors, removeExisitngNote } from '../../../../../store/existingNotesStore';

const NoteActions = ({note, notebook, isInUndefined = true, onCloseModal = () => {}}) => {
    const dispatch = useDispatch();
    const notebooks = notebooksSelectors.selectAll(store.getState());
    
    console.log('Notebooks: ', notebooks, notebook);
    const [assignedNotebook, setAssignedNotebook] = useState({});
    const [notebookOptions, setNotebookOptions] = useState(notebooks);

    useEffect(() => {
        setAssignedNotebook(notebook);
    }, []);

    useEffect(() => {
        setNotebookOptions(notebooks);
    }, [assignedNotebook])

    const handleSetNotebook = (newNotebook) => {
        setAssignedNotebook(newNotebook);
        
        // Remove from current notebook 
        if (assignedNotebook?.name === 'Unspecified Notebook') {
            dispatch(removeExisitngNote(note));
        } else {
            console.log('Removing: ', assignedNotebook);
            const filterNotebookNotes = assignedNotebook.notes.filter(noteId => note !== noteId);
            dispatch(updateNotebook({id: assignedNotebook.id, changes: {notes: filterNotebookNotes}}));
        }
        
        // ADD TO NEW NOTEBOOK SELECTED
        const updatedNotes = [...newNotebook.notes, note];
        dispatch(updateNotebook({id: newNotebook.id, changes: {notes: updatedNotes}}));
    }

    const handleSetToUnspecified = () => {
        setAssignedNotebook({name: 'Unspecified Notebook'});

        const existingNotes = unSpecifiedNotesSelectors.selectAll(store.getState());
        const isInExisting = existingNotes.find(option => option.id === note);

        if (!isInExisting) {
            const filterNotebookNotes = assignedNotebook.notes.filter(noteId => note !== noteId);
            dispatch(updateNotebook({id: assignedNotebook.id, changes: {notes: filterNotebookNotes}}));

            dispatch(addExistingNote({id: note}));
        }
        
    }
    
    return (
        <ActionsWrapper>
            <ActionsContainer>
                {isInUndefined &&
                    (
                        <AssignNotebook>
                            <p>Assign Notebook:</p>
                            <Dropdown
                                trigger={
                                    <div className="dropdown-trigger">
                                        {assignedNotebook?.name}
                                        <Arrow/>
                                    </div>
                                }
                            >
                                <div className="options-container">
                                    <ListItem
                                        hasIcon={false}
                                        name="Unspecified Notebook"
                                        style={{color: 'white', paddingLeft: 0}}
                                        onClick={handleSetToUnspecified}
                                    />
                                    {notebookOptions.map((option, index) => {
                                        return (
                                            <ListItem
                                                hasIcon={false}
                                                key={Math.random() + index}
                                                name={option.name}
                                                style={{color: 'white', paddingLeft: 0}}
                                                onClick={() => handleSetNotebook(option)}
                                            />
                                        )
                                    })}
                                </div>
                            </Dropdown>
                            
                        </AssignNotebook>
                    )
                }

                <TagsContainer>
                    TAGS
                </TagsContainer>

                <Footer>
                    <button
                        className="close"
                        onClick={onCloseModal}
                    >
                        CLOSE
                    </button>
                </Footer>

            </ActionsContainer>
        </ActionsWrapper>
    )
};

export default NoteActions;

const ActionsWrapper = styled.div`
    /* min-height: 5rem; */
    min-width: 30rem;
`;

const ActionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;

    padding: var(--space-16) var(--space-24);
    min-height: 10rem;
    width: 100%;
    background: var(--color-white);

    box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04);
    border-radius: 0.5rem;
`;

const AssignNotebook = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    .title {}

    .dropdown-trigger {
        width: 12rem;
        height: 2rem;
        padding: 0 var(--space-10);
        margin-left: var(--space-14);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        border: 1px solid var(--color-gray-300);
        box-sizing: border-box;
        border-radius: 0.25rem;

        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }

    .options-container {

    }
`;

const TagsContainer = styled.div`
    flex: 1;
    height: 100%;
    background: lightblue;
`;

const Footer = styled.div`
    flex-shrink: 1;
    height: 2rem;
    width: 100%;

    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    .close {
        margin: 0;
        padding: var(--space-6) var(--space-12);
        outline: none;
        background: transparent;

        border: 1px solid var(--color-orange-800);
        box-sizing: border-box;
        border-radius: 0.25rem;

        cursor: pointer;
        color: var(--color-orange-700);

        &:hover {
            background: var(--color-orange-100);
        }

    }
`;