import React, {useState} from "react";
import styled from "styled-components";
import ListItem from "../ListItem";
import folderIcon from '../../assets/svg/folder.svg';

const Notebook = ({name = "", handleSelectNotebook, isOpen, options, handleClickOption}) => {
    return (
        <div style={{position: 'relative'}}>
            <ListItem
                icon={folderIcon}
                name={name}
                onClick={handleSelectNotebook}
            />
            {
                isOpen && (
                    <DropdownWrapper>
                        <DropdownContainer>
                            {options.map(option => {
                                return (
                                    <Option option={option?.title} onClick={() => handleClickOption(option?.id)}/>
                                )
                            })}
                            
                        </DropdownContainer>
                    </DropdownWrapper>
                    
                )
            }
        </div>
    )
}

export default Notebook;

const Option = ({option, onClick}) => {
    return (
        <StyledOption onClick={onClick}>
            {option}
        </StyledOption>
    )
}

const DropdownWrapper = styled.div`
    height: 6rem;
    position: absolute;
    left: var(--space-32);
    right: var(--space-32);
    z-index: 2;
    box-shadow: 0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04);
    border-radius: 8px;
`;
const DropdownContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--space-12) 0;
    background: var(--color-white);
    overflow: auto;

    /* margin: var(--space-12);
    background: yellowgreen; */
`;

const StyledOption = styled.div`
    padding: var(--space-6) var(--space-16);
    :hover {
        background: var(--color-orange-200);
    }
`;
