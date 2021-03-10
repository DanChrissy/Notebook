import React from "react";
import styled from 'styled-components';

const Button = ({title = "", onClick = () => {}}) => {
    return (
        <ButtonWrapper>
            <ButtonContainer>
                {title}
            </ButtonContainer>
        </ButtonWrapper>
    )
}

export default Button;

const ButtonWrapper = styled.div`
    height: 2rem;
`;

const ButtonContainer = styled.button`
    margin: 0;
    border: 1px solid var(--color-orange-400);
    border-radius: 4px;
    height: 100%;
    width: max-content;
    padding: var(--space-2) var(--space-6);
    background: var(--color-orange-200);
    color: var(--color-orange-600);
`;