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
import store from "../../../store";
import { notesSelectors } from "../../../store/notesStore";
import Dropdown, {Option} from "../../../components/Dropdown";

const SideBar = ({handleCreateNote, handleSelectNotebook, handleSelectNote, handleOpenCreationOption }) => {
    // console.log("Notes: ", notesSelectors.selectAll(store.getState()));

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

                    <div className="section bookmarks">
                        <p className="section-header">BOOKMARKS</p>
                        <Bookmarks
                            handleSelectBookmark={handleSelectNote}
                        />
                    </div>

                    <div className="section notebooks">
                        <p className="section-header">NOTEBOOKS</p>
                        <Notebooks
                            handleSelectNotebook={handleSelectNotebook}
                            handleSelectNote={handleSelectNote}
                        />
                    </div>

                    <div className="content-items">
                        <span className="trash">
                            <ListItem icon={trashIcon} name="Trash"/>
                        </span>
                        <ListItem
                            icon={createIcon}
                            name="Add Note or Notebook"
                            create 
                            // onClick={handleCreateNote}
                            onClick={handleOpenCreationOption}
                        />

                        {/* <Dropdown
                            trigger={
                                <ListItem icon={createIcon} name="Add Note or Notebook" create onClick={handleCreateNote}/>
                            }
                        >
                            <>
                                <Option option="Note"/>
                                <Option option="Notebook"/>

                            </>
                        </Dropdown> */}
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
    display: flex;
    flex-direction: column;
    position: relative;

    /* padding-top: 2.5rem; */
    background: #fffcf5;
`;

const SideBarHeader = styled.div`
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    padding-top: 2.5rem;
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
    /* height: 43rem; */
    overflow: scroll;

    .section {
        margin-bottom: 1.6rem;
    }

    .bookmarks {
        height: 10rem;
        overflow: auto;
    }
    .notebooks {
        height: 15rem;
        overflow: auto;
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
    /* position: absolute; */
    flex-shrink: 1;
    bottom: 0;
    height: 6rem;
    width: 100%;
`;