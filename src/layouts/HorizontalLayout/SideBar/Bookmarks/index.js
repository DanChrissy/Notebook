import React, { useEffect } from "react";
import styled from "styled-components";
import Bookmark from "../../../../components/Bookmark";
import store from "../../../../store";
import { bookmarksSelectors } from "../../../../store/bookmarksStore";
import { notesSelectors } from "../../../../store/notesStore";

const Bookmarks = ({ handleSelectBookmark}) => {
    const bookmarks = bookmarksSelectors.selectAll(store.getState());
    const notes = notesSelectors.selectAll(store.getState());
    useEffect(() => {
        console.log("Update")
    }, [notes]);

    return (
        <BookmarksWrapper>
            <BookmarksContainer>
                {bookmarks.map((bookmark,index) => {
                    const note = notesSelectors.selectById(store.getState(), bookmark?.note);
                    return (
                        <Bookmark
                            key={index}
                            name={note?.title}
                            handleSelectBookmark={() => handleSelectBookmark(note?.id)}
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