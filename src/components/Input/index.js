import React from "react";
import styled, { css } from 'styled-components';

const Input = ({type = 'text', label="Title", onChange = () => {}, ...defaultProps }) => {
    const { multiLine } = defaultProps;
    return (
        <InputWrapper>
            <InputContainer multiLine={multiLine}>
                <span className="input-label">{label}</span>
                {
                    multiLine ? <textarea className="input-container textarea" rows={4}></textarea> :
                    <input className="input-container" type={type} onChange={onChange}/>
                }
                
            </InputContainer>
        </InputWrapper>
    )
}

export default Input;

const InputWrapper = styled.div`
    width: 100%;
    height: 2rem;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 100%;
    width: 50%;

    ${props => props.multiLine && css`
        flex-direction: column;
        align-items: flex-start;

        height: max-content;
    `}

    .input-label {
        width: 8rem;
        color: var(--color-gray-600);
        font-size: var(--font-18);

        padding-right: var(--space-12);

    }

    .input-container {
        flex: 1;
        height: 1.5rem;

        border: 1px solid var(--color-gray-300);
        border-radius: 8px;

        outline: 0;
        padding: 0 var(--space-12);
        padding-bottom: var(--space-2);

    }

    .textarea {
        width: 50%;
        margin-top: var(--space-6);
        padding-top: var(--space-4);
        padding-bottom: var(--space-4);
    }

`;

const InputDiv = styled.input`

`;
