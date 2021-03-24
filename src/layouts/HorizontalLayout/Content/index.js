import React, {useEffect, useState} from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";
import Breadcrumbs from '../../../components/Breadcrumb';
import HoverFormatter from "../../../components/HoverFormatter";
import Note from "../../../components/Note";
import Header from "./Header";
import { Space } from "../../../components/Space";


const Content = ({note = {}}) => {
    const [noteValues, setNoteValues] = useState({});

    useEffect(() => {
        if (!isEmpty(note)) {
            setNoteValues(note);
        }
    }, [note])
    console.log('Note: ', noteValues);
    
    const handleUpdateNoteValues = (e, name) => {
        const { value = ""} = e?.target;
        setNoteValues({
            ...noteValues,
            [name]: value
        })
    }
    return (
        <ContentWrapper>
            <ContentContainer>
                <Header/>
                <Space height="var(--space-40)"/>
                <Note
                    noteValues={noteValues}
                    handleUpdateNoteValues={handleUpdateNoteValues}
                />
            </ContentContainer>
        </ContentWrapper>
    )
}

export default Content;

const ContentWrapper = styled.div`
    flex:1;
    height: 100%;
    min-width: 40rem;
`;

const ContentContainer = styled.div`
    height: 100%;
    width: inherit;
    background-color: white;
    padding-left: var(--space-40);
    padding-right: var(--space-40);
    padding-top: 2.5rem;
`;
