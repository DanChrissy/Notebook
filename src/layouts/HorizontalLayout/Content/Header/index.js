import React from 'react';
import styled, { css } from 'styled-components';
import Breadcrumbs from '../../../../components/Breadcrumb';
import { ReactComponent as Bookmark} from '../../../../assets/svg/favourite.svg';
import { ReactComponent as More} from '../../../../assets/svg/more-horizontal.svg';
import { ReactComponent as Waste} from '../../../../assets/svg/waste.svg';
import { getIsBookmark } from '..';
import Dropdown from '../../../../components/Dropdown';

export default function Header({ breadCrumbHistory = {}, isBookmark = true, toggleBookMark = () => {}, onRemoveNote = () => {} }) {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <BreadcrumbsContainer>
                    <BookmarkIcon isBookmark={isBookmark} onClick={() => breadCrumbHistory.note && toggleBookMark()}/>
                    <Breadcrumbs breadCrumbs={breadCrumbHistory}/>
                </BreadcrumbsContainer>
                <Waste
                    stroke="var(--color-orange-800)"
                    style={{paddingRight: 'var(--space-16)', cursor: 'pointer'}}
                    onClick={onRemoveNote}
                />
            </HeaderContainer>
        </HeaderWrapper>
    )
};

const HeaderWrapper = styled.div`
    width: 100%;
`;
const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: var(--space-16);
    border-bottom: 1px solid var(--color-gray-300);
`;

const BreadcrumbsContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const BookmarkIcon = styled(Bookmark)`
    margin-right: var(--space-8);
    ${props => props.isBookmark && css`
        stroke: var(--color-orange-400);
        fill: var(--color-orange-400);;
    `}
`;

const MoreIcon = styled(More)`
    stroke: var(--color-gray-500);
`;

const Actions = styled.div`
    display: flex;
    flex-direction: column;

    .action {
        display: flex;
        flex-direction: row;

    }
`;
