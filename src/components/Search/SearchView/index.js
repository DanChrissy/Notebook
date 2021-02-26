import React from "react";
import styled, {css} from "styled-components";
import SearchInput from "./SearchInput";
import { ReactComponent as SearchIcon } from '../../../assets/svg/search.svg';

const SearchView = () => {
    return (
        <SearchViewWrapper>
            <SearchViewContainer>
                <div className="icon">
                    <SearchIcon stroke="#8d9aa5"/>
                </div>
                <SearchInput/>
            </SearchViewContainer>
        </SearchViewWrapper>
    )
}

export default SearchView;

const SearchViewWrapper = styled.div`
    width: 100%;
    height: var(--space-32);
    border-bottom: 1px solid var(--color-gray-300);
    padding-bottom: var(--space-8);
`;

const SearchViewContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    width: 100%;

    .icon {
        margin-right: var(--space-14);
        margin-top: var(--space-2);
    }
`;