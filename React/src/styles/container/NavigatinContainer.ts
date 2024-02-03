import styled, {keyframes} from "styled-components";
import Navbar from "react-bootstrap/Navbar";

export const navColorChange = keyframes`
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

export const NavStyle = styled(Navbar)`
    display: flex;
    justify-content: space-between;
    padding-left: 30px;
    padding-right: 30px;

    a {
        margin: 2px;
        animation: ${navColorChange} 3s infinite;

        &:hover {
            background-color: rgba(250, 250, 210, 0);
            color: rgba(250, 250, 210, 0.5);
            transform: scale(1.12);
            transition: color 0.5s;
            animation: none;
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
    }
`;

export const NavSignInStyle = styled.div`
    @media (max-width: 768px) {
        transform: scale(0.8);
    }
`;