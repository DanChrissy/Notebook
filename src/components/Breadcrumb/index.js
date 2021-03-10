import React from "react";
import styled, {css} from 'styled-components';

const Breadcrumbs = ({historyList = ['Bookshelf','The Obstacle is The Way']}) => {
    return (
        <BreadCrumbsWrapper>
            {
                historyList.map((breadcrumb, index) => {
                    return (
                        <BreadCrumb key={index}>{breadcrumb}</BreadCrumb>
                    )
                })
            }
        </BreadCrumbsWrapper>
    )
}

export default Breadcrumbs;

const BreadCrumbsWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const BreadCrumb = styled.p`
    color: var(--color-gray-500);
    font-size: var(--font-16);
    &:not(:last-child):after{
        content: ' / ';
        padding-right: var(--space-4);
    }
`