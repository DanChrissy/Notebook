import React from "react";
import styled from 'styled-components';
import Input from '../../components/Input';
import FormContent from './FormContent';

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
    width: 50rem;
`;

const FormContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;

    background-color: var(--color-white);
    
    padding: var(--space-10) var(--space-12);
    border-radius: 4px;

    height: 100%;
    width: 100%;
    overflow: auto;
`