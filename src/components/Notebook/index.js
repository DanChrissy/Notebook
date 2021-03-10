import React from "react";
import ListItem from "../ListItem";
import folderIcon from '../../assets/svg/folder.svg';

const Notebook = ({name = "", handleSelectNotebook}) => {
    return (
        <ListItem
            icon={folderIcon}
            name={name}
            onClick={handleSelectNotebook}
        />
    )
}

export default Notebook;
