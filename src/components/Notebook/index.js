import React, {useState} from "react";
import styled from "styled-components";
import ListItem from "../ListItem";
import folderIcon from '../../assets/svg/folder.svg';

const Notebook = ({name = "", handleSelectNotebook, handleEditNotebok = () => {}, handleRemoveNotebok = () => {}, actions = true }) => {

    return (
        <NotebookWrapper>
            <ListItem
                actions={actions}
                icon={folderIcon}
                name={name}
                onClick={handleSelectNotebook}
                handleEdit={(newValue) => handleEditNotebok(newValue)}
                handleRemove={handleRemoveNotebok}
            />
        </NotebookWrapper>
    )
}

export default Notebook;

const NotebookWrapper = styled.div`
    width: 100%;
    position: relative;
`;
