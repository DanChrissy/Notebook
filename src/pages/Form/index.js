import React from "react";
import styled from 'styled-components';
import Input from '../../components/Input';

const Form = () => {
    return (
        <FormWrapper>
            <FormContainer>
                <Input label="Title"/>
                <Input label="Subtitle"/>
                <Input label="Description" multiLine/>
                <FormContent/>
            </FormContainer>
        </FormWrapper>
    )
}

export default Form;

const FormWrapper = styled.div`
    height: 40rem;
    width: 100%;
`;

const FormContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;

    background-color: yellow;

    height: 100%;
    width: 100%;
`