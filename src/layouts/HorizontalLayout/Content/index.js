import React from "react";
import styled from "styled-components";
import Breadcrumbs from '../../../components/Breadcrumb';
import Form from "../../../pages/Form";
import HoverFormatter from "../../../components/HoverFormatter";

const Content = () => {
    return (
        <ContentWrapper>
            <ContentContainer>
                <Breadcrumbs/>
                <HoverFormatter/>
                <Form/>
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
`;