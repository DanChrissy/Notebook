import React from "react";
import styled from 'styled-components';
import Button from "../../../components/Button";
import Input from "../../../components/Input";

const FormContent = () => {
    return (
        <ContentWrapper>
            <ContentContainer>
                <p className="form-text form-instructions">Add the note content below:</p>
                <Input multiLine rows={10}/>
                <Button title="Add List" onClick={() => {}}/>
            </ContentContainer>
        </ContentWrapper>
    )
}

export default FormContent;

const ContentWrapper = styled.div`
    width: 100%;
    /* height: 60rem; */
`;

const ContentContainer = styled.div`

`