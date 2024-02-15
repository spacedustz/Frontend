import styled from "styled-components";
import Navbar from "react-bootstrap/Navbar";
import {NoteTextColor} from "../animation/TextAnimation.ts";

export const NavStyle = styled(Navbar)`
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;

    a {
        margin: 2px;
        animation: ${NoteTextColor} 10s infinite;

        &:hover {
            background-color: rgba(250, 250, 210, 0);
            color: rgba(250, 250, 210, 0.5);
            transform: scale(1.12);
            transition: color 0.5s;
            animation: none;
        }
        
        @media (max-width: 768px) {
            font-size: 10px;
        }
    }
    
    button {
        @media (max-width: 768px) {
            font-size: 10px;
        }
    }
`;

export const NavImageStyle = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;

    @media (max-width: 768px) {
        width: 15px;
        height: 15px;
        margin-right: 2px;
    }
`;

export const NavSignInStyle = styled.div`
    @media (max-width: 768px) {
        transform: scale(0.65);
    }
`;