import React, {useState} from "react";
import styled from "styled-components";
import ListItem from "../ListItem";
import folderIcon from '../../assets/svg/folder.svg';

const Notebook = ({name = "", handleSelectNotebook}) => {

    return (
        <NotebookWrapper>
            <ListItem
                icon={folderIcon}
                name={name}
                onClick={handleSelectNotebook}
            />
        </NotebookWrapper>
    )
}

export default Notebook;

const NotebookWrapper = styled.div`
    width: 100%;
    position: relative;
`;
