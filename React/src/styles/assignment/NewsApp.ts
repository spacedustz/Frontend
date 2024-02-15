import styled from "styled-components";
import {Col, Row} from "react-bootstrap";

export const NewsContainer = styled.div`
    background-color: white;
    height: 100%;
    width: 100%;
`;

export const HeadLine = styled.div`
    padding-top: 1em;
    padding-bottom: 1em;
    display: flex;
    justify-content: center;

    svg {
        width: 430px;
    }
`;

export const Menu = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    border-top: 1px solid #ebebeb;
    border-bottom: 4px double #000;
    margin-left: 11px;

    button {
        background-color: beige;
        color: black;
    }
`;

export const Img = styled.img`
    max-height: 240px;
    max-width: 100%;
`;

export const News = styled(Row)`
    border-bottom: 2px solid black;
    margin-left: 11px
`;

export const NewsCol = styled(Col)`
    padding-left: 0;
`;