import React from "react";
import styled from "styled-components";
import createIcon from '../../../assets/svg/create.svg';
import Bookmark from "../../../components/Bookmark";
import ListItem from "../../../components/ListItem";
import Notebook from "../../../components/Notebook";
import Profile from "../../../components/Profile";
import Search from "../../../components/Search";

const SideBar = () => {
    return (
        <SideBarWrapper>
            <SideBarContainer>
                <SideBarHeader>
                    <div className="profile">
                        <Profile/>
                    </div>
                    <div className="search">
                        <Search/>
                    </div>
                </SideBarHeader>

                <Bookmark/>
                <Notebook/>
                <ListItem icon={createIcon} name="Add Note or Notebook" create/>

            </SideBarContainer>
        </SideBarWrapper>
    )
}

export default SideBar;

const SideBarWrapper = styled.div`
    height: 100%;
    width: 30rem;
`;

const SideBarContainer = styled.div`
    height: 100%;
    width:100%;

    padding-top: 2.5rem;
    /* background: #fff9f4; */
`;

const SideBarHeader = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    margin-left: var(--space-32);
    margin-right: var(--space-48);

    div.profile {
        margin-bottom: var(--space-32);
    }
`;

const SideBarFooter = styled.div``;