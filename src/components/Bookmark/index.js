import React from "react";
import ListItem from "../ListItem";
import fileIcon from '../../assets/svg/file.svg';

const Bookmark = ({name = "The Obstacle Is The Way", handleSelectBookmark}) => {
    return (
        <ListItem
            icon={fileIcon}
            name={name}
            onClick={handleSelectBookmark}
        />
    )
}

export default Bookmark;
