import React from "react";
import styled from "styled-components";
import Bookmark from "../../../../components/Bookmark";

const Bookmarks = ({ bookmarks = [], handleSelectBookmark}) => {
    
    return (
        <BookmarksWrapper>
            <BookmarksContainer>
                {bookmarks.map((bookmark,index) => {
                    return (
                        <Bookmark
                            key={index}
                            name={bookmark?.title}
                            handleSelectBookmark={() => handleSelectBookmark(bookmark?.id)}
                        />
                    )
                })}
            </BookmarksContainer>
        </BookmarksWrapper>
    )
}

export default Bookmarks;

const BookmarksWrapper = styled.div`
    height: 100%;
    width: 100%;
`;

const BookmarksContainer = styled.div`
    display: flex;
    flex-direction: column;
`;