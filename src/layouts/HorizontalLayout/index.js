import React from "react";
import styled from 'styled-components';
import Content from "./Content";
import SideBar from "./SideBar";

const HorizontalLayout = () => {
    return (
        <LayoutWrapper>
            <LayoutContainer>
                <SideBar/>
                <Content/>
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