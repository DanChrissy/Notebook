import React from "react";
import styled, {css} from 'styled-components';

const Breadcrumbs = ({breadCrumbs = {}}) => {
    const { notebook, note} = breadCrumbs;
    return (
        <BreadCrumbsWrapper>
            {notebook && <BreadCrumb>{notebook}</BreadCrumb>}
            {note && <BreadCrumb>{note}</BreadCrumb>}
            {/* {
                keys.map((breadcrumbKey, index) => {
                    return (
                        <BreadCrumb key={index}>{breadCrumbs[breadcrumbKey]}</BreadCrumb>
                    )
                })
            } */}
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
    font-size: var(--font-12);
    &:not(:last-child):after{
        content: ' / ';
        padding-right: var(--space-4);
    }
`