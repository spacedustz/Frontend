import styled, {keyframes} from "styled-components";
import {Container} from "react-bootstrap";
import Card from "react-bootstrap/Card";

export const MainCard = styled(Card)`
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const cardColorChange = keyframes`
    0% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(250, 250, 210, 0.5);
    }
    50% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(250, 250, 210, 0.8);
    }
    100% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(250, 250, 210, 0.5);
    }
`;

const CardContainer = styled(Container)`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;

    img {
        width: 50%;
        height: 100%;
        
        @media (max-width: 768px) {
            width: 37%;
            height: 90%;
        }
    }

    a {
        text-decoration: none;
        color: cadetblue;
        font-weight: 700;

        &:hover {
            transition: color 0.5s;
        }
    }

    div, h5, h6 {
        font-weight: bold;
        color: white;
        animation: ${cardColorChange} 3s infinite;
    }
`;

export default CardContainer;