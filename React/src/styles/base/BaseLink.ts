import styled from "styled-components";

export const BaseLink = styled.a`
    text-decoration: none;
    color: black;
    margin-right: 15px;

    &:hover {
        text-decoration: underline;
        transition: color 0.5s;
        color: cornflowerblue;
    }
`;