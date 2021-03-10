import React from "react";
import styled, { css } from 'styled-components';

const Input = ({type = 'text', label, onChange = () => {}, ...defaultProps }) => {
    const { multiLine, rows = 4 } = defaultProps;
    return (
        <InputWrapper>
            <InputContainer rows={rows}>
                {label && <span className="input-label">{label}</span>}
                {
                    multiLine ? <textarea className="input-container textarea"></textarea> :
                    <input className="input-container" type={type} onChange={onChange}/>
                }
                
            </InputContainer>
        </InputWrapper>
    )
}

export default Input;

const InputWrapper = styled.div`
    width: 100%;
    /* height: 2rem; */
    margin-bottom: var(--space-4);

    ${props => props.multiLine && css`
        /* height: max-content;
        height: 4rem; */
        background: red;
    `}
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 100%;
    width: 100%;

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
        height: ${props =>  `${props.rows}rem`};
        margin-top: var(--space-6);
        padding-top: var(--space-4);
        padding-bottom: var(--space-4);
    }

`;

const InputDiv = styled.input`

`;
