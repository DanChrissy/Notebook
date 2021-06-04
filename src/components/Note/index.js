import React, { useEffect, useState, useContext } from 'react';
import styled, {css} from 'styled-components';
import { HeaderInput, MuliLineInput, SubHeader} from './noteInputs';
import { Space } from '../Space';
import Input from '../Input';
import { addNote, notesSelectors, updateNote } from '../../store/notesStore';
import {PageContext} from '../../contexts/PageContext';
import store from '../../store';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';

export default function Note({note, handleUpdateNoteValues = () => {}}) {
    const dispatch = useDispatch();
    const noteObj = notesSelectors.selectById(store.getState(), note);
    const [noteValues, setNotesValues] = useState({});
    const { pageState, setPageState } = useContext(PageContext);

    // TODO: Creating note - save to unspecified notebook initially (gives the user opportunity to associate with a notebook later)
    
    useEffect(() => {  
        setNotesValues({...noteObj});
        if (!note) {
            dispatch(addNote({}))
            console.log("Add new note");
        }
    }, [note])

    useEffect(() => {
        if (note) {
            console.log("Updating note: ", note);
            dispatch(updateNote({
                id: note,
                changes: {...noteValues}
            }))
            setPageState({...pageState, loading: true});
        }
    } ,[noteValues]);

    const updateNoteFields = (e, name) => {
        const { value = "" } = e?.target;
        setNotesValues({
            ...noteValues,
            [name] : value
        })
    };

    const { title = "", subtitle = "", description = "", body = ""} = noteValues || {};

    return (
        <NoteWrapper>
            <NoteContainer>
                <HeaderInput
                    value={title}
                    // onChange={(e) => handleUpdateNoteValues(e, 'title')}
                    onChange={(e) => updateNoteFields(e, 'title')}
                    placeholder="Note title"
                />
                <Space/>
                <SubHeader
                    value={subtitle}
                    // onChange={(e) => handleUpdateNoteValues(e, 'subtitle')}
                    onChange={(e) => updateNoteFields(e, 'subtitle')}
                    placeholder="Subtitle"
                />
                <Space/>
                <DescriptionWrapper>
                    <MuliLineInput
                        value={description}
                        // onChange={(e) => handleUpdateNoteValues(e, 'description')}
                        onChange={(e) => updateNoteFields(e, 'description')}
                        placeholder="Add a Description"
                    />
                </DescriptionWrapper>
                <Space/>
                <Body>
                    <MuliLineInput
                        value={body}
                        // onChange={(e) => handleUpdateNoteValues(e, 'body')}
                        onChange={(e) => updateNoteFields(e, 'body')}
                        rows={20}
                        styleProps={{fontSize: 'var(--font-20)'}}
                        placeholder="Add some details..."
                    />
                </Body>
            
            </NoteContainer>
        </NoteWrapper>
    )
}

const NoteWrapper = styled.div`
    /* height: 100%; */
    flex: 1;
    width: 100%;
`;

const NoteContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`;

const DescriptionWrapper = styled.div`
    height: max-content;
    border-left: 4px solid var(--color-orange-400);
    padding: var(--space-4) var(--space-8);
`;

const Body = styled.div`
    flex: 1;
    height: 100%;
`;