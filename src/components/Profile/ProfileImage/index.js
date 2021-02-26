import React from "react";
import styled from 'styled-components';

const ProfileImage = () => {
    return (
        <ImageWrapper>
            <ImageContainer>

            </ImageContainer>
        </ImageWrapper>
    )
}

export default ProfileImage;

const ImageWrapper = styled.div`
    height: 100%;
    width: 3rem;
`;

const ImageContainer = styled.div`
    height: inherit;
    width: inherit;

    border-radius: 8px;

    background-color: orange;
`;