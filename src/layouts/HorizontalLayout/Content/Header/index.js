import React from 'react';
import styled, { css } from 'styled-components';
import Breadcrumbs from '../../../../components/Breadcrumb';
import { ReactComponent as Bookmark} from '../../../../assets/svg/favourite.svg';
import { ReactComponent as More} from '../../../../assets/svg/more-horizontal.svg';

export default function Header({ breadCrumb, isBookmark = true}) {
    return (
        <HeaderWrapper>
            <HeaderContainer>
                <BreadcrumbsContainer>
                    <BookmarkIcon isBookmark={isBookmark}/>
                    <Breadcrumbs/>
                </BreadcrumbsContainer>
                <MoreIcon/>
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
