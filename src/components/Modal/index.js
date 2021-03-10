import React from "react";
import styled from "styled-components";

const Modal = ({children}) => {
    return (
        <ModalWrapper>
            <ModalContainer>
                {children}
            </ModalContainer>
        </ModalWrapper>
    )
}

export default Modal;

const ModalWrapper = styled.div`
    height: 100vh;
    width: 100vw;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
`;

const ModalContainer = styled.div`
    height: 100%;
    width: inherit;
    background-color: rgba(55, 59, 62, 0.7);

    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 5rem;
`;