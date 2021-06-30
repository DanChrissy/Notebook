import React, { useEffect, useState, useContext, useRef, useLayoutEffect } from 'react';
import styled, {css} from 'styled-components';
import { HeaderInput, MuliLineInput, SubHeader} from './noteInputs';
import { Space } from '../Space';
import Input from '../Input';
import { addNote, notesSelectors, updateNote } from '../../store/notesStore';
import {PageContext} from '../../contexts/PageContext';
import store from '../../store';
import { useDispatch } from 'react-redux';
import Modal from '../Modal';
import { addExistingNote } from '../../store/existingNotesStore';
import WYSIWYG from '../WYSIWYG';

export default function Note({note, handleUpdateNoteValues = () => {}}) {
    const editorRef = useRef();
    const dispatch = useDispatch();
    const noteObj = notesSelectors.selectById(store.getState(), note);
    const [noteValues, setNotesValues] = useState({});
    const [nextNoteId, setNextNoteId] = useState();
    const { pageState, setPageState } = useContext(PageContext);

    const [size, setSize] = useState({height: 500});

    const [initialContent, setInitialContent] = useState('');

    // TODO: Creating note - save to unspecified notebook initially (gives the user opportunity to associate with a notebook later)
    
    useEffect(() => {  
        setNotesValues({...noteObj});
        setInitialContent(noteObj);
        if (!note) {
            const notes = notesSelectors.selectAll(store.getState());
            const nextNote = notes.slice(-1)[0].id + 1;
            dispatch(addNote({id: nextNote}));
            dispatch(addExistingNote({id: nextNote}));
            setNextNoteId(nextNote);
        }
    }, [note])

    useEffect(() => {
        if (note) {
            console.log("Updating note: ", note);
            dispatch(updateNote({
                id: note,
                changes: {...noteValues}
            }))
        } else {
            dispatch(updateNote({
                id: nextNoteId,
                changes: {...noteValues}
            }))
        }
        setPageState({...pageState, loading: true});

    } ,[noteValues]);

    useLayoutEffect(() => {
        // Handle height of editor container on screen resize
        console.log('Window height: ', window.innerHeight);
        function handleResize() {
            if (editorRef) {
                console.log('Editor')
                setSize({
                    height: editorRef.current.clientHeight,
                    width: editorRef.current.clientWidth
                })
            }
        }

        window.addEventListener('resize', handleResize)

        return _ => {
            window.removeEventListener('resize', handleResize)
        }
    }, [window])

    const updateNoteFields = (e, name) => {
        const { value = "" } = e?.target;
        setNotesValues({
            ...noteValues,
            [name] : value
        })
    };

    const { title = "",  content = "", subtitle = "", description = "", body = ""} = noteValues || {};

    const getEditorData = (data) => {
        console.log('Editor data: ', data);
        setNotesValues({...noteValues, content: data});
    }

    return (
        <NoteWrapper>
            <NoteContainer>
                <HeaderInput
                    value={title}
                    onChange={(e) => updateNoteFields(e, 'title')}
                    placeholder="Note title"
                />
                <Space/>
                <Editor ref={editorRef}>
                    <WYSIWYG
                        onChange={getEditorData}
                        size={size}
                        content={initialContent?.content}
                    />
                </Editor>
                {/*  */}
                {/* <HeaderInput
                    value={title}
                    onChange={(e) => updateNoteFields(e, 'title')}
                    placeholder="Note title"
                />
                <Space/>
                <SubHeader
                    value={subtitle}
                    onChange={(e) => updateNoteFields(e, 'subtitle')}
                    placeholder="Subtitle"
                />
                <Space/>
                <DescriptionWrapper>
                    <MuliLineInput
                        value={description}
                        onChange={(e) => updateNoteFields(e, 'description')}
                        placeholder="Add a Description"
                    />
                </DescriptionWrapper>
                <Space/>
                <Body>
                    <MuliLineInput
                        value={body}
                        onChange={(e) => updateNoteFields(e, 'body')}
                        rows={20}
                        styleProps={{fontSize: 'var(--font-20)'}}
                        placeholder="Add some details..."
                    />
                </Body>
             */}
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

const Editor = styled.div`
    flex: 1;
`;