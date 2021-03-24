import styled from 'styled-components';

export const Space = styled.div`
    height: ${props => props.height || 'var(--space-18)'};
`;