import React, {useRef, useState} from 'react';
import styled, { css } from "styled-components";
import useOnClickOutside from '../../hooks/useOnClickOutside';

export default function Dropdown({trigger, children, isTriggerPaused = false}){
    const dropdownRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    useOnClickOutside(dropdownRef, () => setIsOpen(false));

    function toggleSelect() {
        !isTriggerPaused && setIsOpen(!isOpen);
    }
    return (
        <MenuDropdownContainer ref={dropdownRef}>
            <Trigger onClick={toggleSelect}>
                {trigger}
            </Trigger>
            {
                isOpen &&
                    (
                        <DropdownContainer
                            onClick={toggleSelect}                          
                        >
                            {children}
                        </DropdownContainer>
                    )
            }
        </MenuDropdownContainer>
    )
}

export const Option = ({option, onClick}) => {
    return (
        <StyledOption onClick={onClick}>
            {option}
        </StyledOption>
    )
}

const MenuDropdownContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    
    font-style: normal;
    font-size: 1rem;

    /* margin-top: 0.5rem; */
`;

const Trigger = styled.div`
    width: 100%;
    display: flex;
    cursor: pointer;
`;

const DropdownContainer = styled.div`
    height: 4rem;
    width: 15rem;
    padding: 0.5rem 0.8755rem;
    outline: none;
    z-index: 2;
    /* transform-origin: top; */
    position: absolute;
    left: 1rem;
    top: 2.125rem;
    /* Merge */
    color: var(--color-white);
    color: white;
    font-weight: 400;
    background: var(--color-gray-800);
    border-radius: 0.25rem;
    text-align: left;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const StyledOption = styled.div`
    padding: var(--space-6) var(--space-16);
    :hover {
        background: var(--color-orange-200);
    }
`;