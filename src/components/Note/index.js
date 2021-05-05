import React, { useEffect, useState } from 'react';
import styled, {css} from 'styled-components';
import { HeaderInput, MuliLineInput, SubHeader} from './noteInputs';
import { Space } from '../Space';
import Input from '../Input';
import { notesSelectors, updateNote } from '../../store/notesStore';
import store from '../../store';
import { useDispatch } from 'react-redux';

export default function Note({note, handleUpdateNoteValues = () => {}}) {
    const dispatch = useDispatch();
    const noteObj = notesSelectors.selectById(store.getState(), note);
    const [noteValues, setNotesValues] = useState({});

    useEffect(() => {
        setNotesValues({...noteObj});
    }, [note])

    useEffect(() => {
        dispatch(updateNote({
            id: note,
            changes: {...noteValues}
        }))
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
                        rows={30}
                        styleProps={{fontSize: 'var(--font-20)'}}
                        placeholder="Add some details..."
                    />
                </Body>
                
            </NoteContainer>
        </NoteWrapper>
    )
}

const NoteWrapper = styled.div`
    height: 100%;
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