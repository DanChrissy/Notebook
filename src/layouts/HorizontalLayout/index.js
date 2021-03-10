import React, { useRef, useState } from "react";
import styled from 'styled-components';
import Content from "./Content";
import SideBar from "./SideBar";
import Modal from "../../components/Modal";
import Form from "../../pages/Form";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const HorizontalLayout = () => {
    const modalRef = useRef();
    const [modalOpen, setMddalOpen] = useState(false);
    useOnClickOutside(modalRef, () => setMddalOpen(false));

    const handleCreateNote = () => {
        setMddalOpen(true);
    }

    return (
        <LayoutWrapper>
            <LayoutContainer>
                <SideBar handleCreateNote={handleCreateNote}/>
                <Content/>
                {modalOpen && 
                    <Modal>
                        <div ref={modalRef}>
                            <Form/>
                        </div>
                    </Modal>
                }
            </LayoutContainer>
        </LayoutWrapper>
    )
}

export default HorizontalLayout;

const LayoutWrapper = styled.div`
    height: 100vh;
    width: 100vw;
`;

const LayoutContainer = styled.div`
    flex:1;
    display: flex;
    flex-direction: row;

    height: 100%;
    width: 100%;
`