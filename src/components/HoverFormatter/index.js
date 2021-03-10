import React from "react";
import styled from "styled-components";
import { ReactComponent as BoldIcon} from '../../assets/svg/bold.svg';
import { ReactComponent as UnderlineIcon} from '../../assets/svg/underline.svg';
import { ReactComponent as ItalicIcon} from '../../assets/svg/italic.svg';
import { ReactComponent as LinkIcon} from '../../assets/svg/link.svg';


const TEST_OPTIONS = [
    {
        option: 'Bold',
        Icon: <BoldIcon/>
    },
    {
        option: 'Italic',
        Icon: <ItalicIcon/>
    },
    {
        option: 'Underline',
        Icon: <UnderlineIcon/>
    },
    {
        option: 'Hyperlink',
        Icon: <LinkIcon/>
    }
]

const HoverFormatter = ({options = [...TEST_OPTIONS]}) => {
    return (
        <HoverFormatterWrapper>
            <HoverFormatterContainer>
                <FormatHeader>Body</FormatHeader>
                <FormatOptions>
                    {
                        options.map((option,index) => {
                            return (
                                <div className="option" key={index}>{option.Icon}</div>
                            )
                        })
                    }
                </FormatOptions>
            </HoverFormatterContainer>
        </HoverFormatterWrapper>
    )
}

export default HoverFormatter;

const HoverFormatterWrapper = styled.div`
    height: 2rem;
    min-width: 4rem;
    max-width: 14rem;
    border-radius: 25px;
    padding: var(--space-4) var(--space-20);
    border: 1px solid var(--color-gray-300);

`;

const HoverFormatterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    width: inherit;
    height: 100%;
    background-color: white;
    
`;

const FormatHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    border-right: 1px solid var(--color-gray-300);
    padding-right: var(--space-10);
`;

const FormatOptions = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: var(--space-10);

    .option {
        display: flex;
        align-items: center;

        padding-right: var(--space-8);
    }
`;