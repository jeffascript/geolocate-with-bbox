import styled from '@emotion/styled';

export const customErr = 'You requested too many nodes (limit is 50000). Request a smaller area to proceed';

export const StyledListItem = styled.div`
    // fallback incase the main style wasnt included for this component
    --main-color: #9f7aea;
    --main-bg-color: #e9d8fd;
    padding: 1em;
    border: 3px solid var(--main-color);
    margin: 0.5em auto;
    max-width: 450px;
`;
