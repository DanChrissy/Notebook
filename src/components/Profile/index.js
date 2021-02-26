import React from "react";
import styled from 'styled-components';
import ProfileDescription from "./ProfileDescription";
import ProfileImage from "./ProfileImage";

const Profile = () => {
    return (
        <ProfileWrapper>
            <ProfileContainer>
                <ProfileImage/>
                <ProfileDescription/>
            </ProfileContainer>
        </ProfileWrapper>
    )
}

export default Profile;

const ProfileWrapper = styled.div`
    flex:1;
    height: 3rem;
    width: 100%;
`;

const ProfileContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 100%;
    width: 100%;
`;