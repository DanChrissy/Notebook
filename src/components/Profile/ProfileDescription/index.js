import React from "react";
import styled from 'styled-components';

const ProfileDescription = ({name = "John Doe", email = "johndoe@gmail.com"}) => {
    return (
        <DescriptionWrapper>
            <DescriptionContainer>
                <span className="name">{name}</span>
                <span className="email">{email}</span>
            </DescriptionContainer>
        </DescriptionWrapper>
    )
}

export default ProfileDescription;

const DescriptionWrapper = styled.div`
    flex: 1;
    height: 100%;
    margin-left: var(--space-20);
`;

const DescriptionContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;

    height: 100%;
    width: 100%;

    .name {
        color: var(--color-gray-800);
        font-size: var(--font-20);
        font-weight: bold;
    }

    .email {
        color: var(--color-gray-500);
        font-size: var(--font-12);
    }
`;