import React from "react";
import styled from "styled-components";

const SearchInput = () => {
    return (
        <Input
            type="text"
            placeholder="Search"
        />
    )
}

export default SearchInput;

const Input = styled.input`
    /* Remove default styles */
    padding: 0;
    margin: 0;
    border: 0;
    outline: 0;

    flex: 1;
    height: 100%;
    background: transparent;
    ::placeholder{
        color: var(--color-gray-500);
        font-size: var(--font-18);
    }
    color: var(--color-gray-500);
    font-size: var(--font-18);

`;
