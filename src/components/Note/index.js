import React from 'react';
import styled, {css} from 'styled-components';
import { HeaderInput, MuliLineInput, SubHeader} from './noteInputs';
import { Space } from '../Space';

export default function Note({noteValues = {}, handleUpdateNoteValues = () => {}}) {
    console.log('Notevalues: ', noteValues);
    return (
        <NoteWrapper>
            <NoteContainer>
                <HeaderInput
                    value={noteValues?.title || ''}
                    onChange={(e) => handleUpdateNoteValues(e, 'title')}
                />
                <Space/>
                <SubHeader
                    value={noteValues?.subtitle || ''}
                    onChange={(e) => handleUpdateNoteValues(e, 'subtitle')}
                />
                <Space/>
                <DescriptionWrapper>
                    <MuliLineInput
                        value={noteValues?.description || ''}
                        onChange={(e) => handleUpdateNoteValues(e, 'description')}
                    />
                </DescriptionWrapper>
                <Space/>

                <Body>
                    <MuliLineInput
                        value={noteValues?.body || ''}
                        onChange={(e) => handleUpdateNoteValues(e, 'body')}
                        rows={20}
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
    background: red;
`;