import React from "react";
import styled, {css} from 'styled-components';
import fileIcon from '../../assets/svg/file.svg';
import { ReactComponent as FileIcon } from "../../assets/svg/file.svg";

const ListItem = ({icon = FileIcon, name = "", onClick = () => {}, ...defaultProps}) => {
    const { create } = defaultProps;
    return (
        <ItemButton type="button" onClick={() => onClick()} {...defaultProps}>
            <ButtonIcon src={icon} {...defaultProps}/>
            <span className="label">{name}</span>
        </ItemButton>
    )
}

export default ListItem;

const ItemButton = styled.button`
    /* Remove default styles */
    outline: 0;
    border:0;
    padding: 0;
    margin: 0;
    background:0;

    display: flex;
    flex-direction: row;
    align-items: center;

    width: 100%;
    height: var(--space-32);

    padding: 0 var(--space-6);
    padding-left: var(--space-32);

    cursor: pointer;
    color: var(--color-gray-800);
    font-size: var(--font-16);

    .label {
        padding-top: var(--space-2);
    }

    :focus{
        background: var(--color-neutral-gray-200);
    }

    /* Creation */
    ${props => props.create && css`
        color: var(--color-orange-500);;
    `}
`;

const ButtonIcon = styled.img`
    height: var(--space-18);
    margin-right: var(--space-20);
    
    ${props => props.create && css`
        stroke: var(--color-orange-500);
    `}
`