import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import createIcon from '../../../assets/svg/create.svg';
import trashIcon from '../../../assets/svg/trash.svg';
import Bookmark from "../../../components/Bookmark";
import ListItem from "../../../components/ListItem";
import Notebook from "../../../components/Notebook";
import Profile from "../../../components/Profile";
import Search from "../../../components/Search";
import Bookmarks from "./Bookmarks";
import Notebooks from "./Notebooks";

const SideBar = ({handleCreateNote, handleSelectNotebook, handleSelectNote, notebooks, bookmarks = [] }) => {
    const formattedBookmarks = bookmarks.map(item => item?.note || {});
   
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

                <SideBarContent>
                    <div className="section">
                        <p className="section-header">BOOKMARKS</p>
                        <Bookmarks bookmarks={[...formattedBookmarks]} handleSelectBookmark={handleSelectNote}/>
                    </div>

                    <div className="section">
                        <p className="section-header">NOTEBOOKS</p>
                        <Notebooks notebooks={[...notebooks]} handleSelectNotebook={handleSelectNotebook}/>
                    </div>

                    <div className="content-items">
                        <span className="trash">
                            <ListItem icon={trashIcon} name="Trash"/>
                        </span>
                        <ListItem icon={createIcon} name="Add Note or Notebook" create onClick={handleCreateNote}/>
                    </div>
                    
                </SideBarContent>
                
                <SideBarFooter/>

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
    flex: 1;
    height: 100%;
    width:100%;
    position: relative;

    padding-top: 2.5rem;
    background: #fffcf5;
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

const SideBarContent = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    margin-top: var(--space-24);
    height: 43rem;
    overflow: scroll;

    .section {
        margin-bottom: 1.6rem;
    }
    .section-header {
        text-transform: uppercase;
        color: var(--color-gray-400);
        font-weight: bold;
        font-size: var(--font-14);

        margin: 0;
        margin-left: var(--space-32);
        padding-bottom: var(--space-10);
    }

    .content-items {
        flex:1;
        display: flex;
        flex-direction: column;
        justify-content:flex-end;

        .trash {
            margin-bottom: var(--space-24);
        }
    }

`;

const SideBarFooter = styled.div`
    position: absolute;
    bottom: 0;
    height: 8rem;
    width: 100%;
`;