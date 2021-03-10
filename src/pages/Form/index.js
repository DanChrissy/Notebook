import React from "react";
import styled from 'styled-components';
import Input from '../../components/Input';
import TextArea from "../../components/Input/TextArea";
import FormContent from './FormContent';

const Form = () => {
    return (
        <FormWrapper>
            <FormContainer>
                <div className="form-header">
                    <p className="form-text form-heading">Note Form</p>
                    <p className="form-text form-instructions">Complete the form below to add a note.</p>
                </div>
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
    
    padding: var(--space-20) var(--space-28);
    border-radius: 4px;

    height: 100%;
    width: 100%;
    overflow: auto;

    .form-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding-bottom: var(--space-32);
        
        p {
            margin: 0;
        }
        
    }

    .form-text{
        color: var(--color-gray-600);
        font-weight: bold;
    }

    .form-heading{
        font-size: var(--font-24);
        padding-bottom: var(--space-10);
    }

    .form-instructions {
        font-size: var(--font-14);
        font-weight: 400;
    }
`