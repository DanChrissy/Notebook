import React from "react";
import ListItem from "../ListItem";
import folderIcon from '../../assets/svg/folder.svg';

const Notebook = ({name = ""}) => {
    return (
        <ListItem
            icon={folderIcon}
            name={name}
            onClick={() => {}}
        />
    )
}

export default Notebook;
