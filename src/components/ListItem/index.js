import React, {useEffect, useState} from "react";
import styled, {css} from 'styled-components';
import fileIcon from '../../assets/svg/file.svg';
import { ReactComponent as FileIcon } from "../../assets/svg/file.svg";
import { ReactComponent as WasteIcon } from "../../assets/svg/waste.svg";
import { ReactComponent as EditIcon } from "../../assets/svg/edit.svg";
import { ReactComponent as TickIcon } from "../../assets/svg/tick.svg";

const ListItem = ({icon = FileIcon, hasIcon= true, name = "", onClick = () => {}, ...defaultProps}) => {
    const { create, actions = false, handleRemove = () => {}, handleEdit = () => {} } = defaultProps;
    
    const [isEditting, setIsEditting] = useState(false);
    const [value, setValue] = useState(name);

    const onChangeItem = e => {
        setValue(e.target.value);
    }

    useEffect(() => {
        if (!isEditting) {
            (name.localeCompare(value) !== 0) && handleEdit(value);
        }
    }, [isEditting])

    return (
        <ItemButton type="button" onClick={() => onClick()} {...defaultProps}>
            {hasIcon && <ButtonIcon src={icon} {...defaultProps}/>}
            { !isEditting ? <span className="label">{value}</span> :
                <input
                    value={value}
                    onChange={onChangeItem}
                />
            }
            
            {actions &&
                <Actions>
                    <div className="action" onClick={handleRemove}>
                        <WasteIcon stroke="var(--color-orange-600)"/>
                    </div>
                    <div className="action" onClick={() => setIsEditting(!isEditting)}>
                        {isEditting ? <TickIcon fill="var(--color-orange-600)"/> : <EditIcon stroke="var(--color-orange-600)"/>}
                    </div>
                    
                </Actions>
            }
            
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
        text-align: left;
        flex: 1;
    }

    :focus{
        background: var(--color-neutral-gray-200);
    }

    input {
        width: 100%;
        border: none;
        color: var(--color-gray-800);
        font-size: var(--font-16);

        :focus{ 
            outline: none;
            border: 1px solid var(--color-orange-300);
            border-radius: 4px;
        }
    }

    /* Creation */
    ${props => props.create && css`
        color: var(--color-orange-500);;
    `}
    /* flex: 1; */
`;

const ButtonIcon = styled.img`
    height: var(--space-18);
    margin-right: var(--space-20);
    
    ${props => props.create && css`
        stroke: var(--color-orange-500);
    `}
`;

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    height: 100%;

    .action {
        width: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        margin-right: var(--space-8);
        :last-child{
            margin-right: 0;
        }
    }
`;