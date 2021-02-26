import React from "react";
import styled from "styled-components";

const Content = () => {
    return (
        <ContentWrapper>
            <ContentContainer>

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
    background-color: gray;
`;