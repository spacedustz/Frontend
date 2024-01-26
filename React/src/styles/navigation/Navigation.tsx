import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React from "react";
import styled, {keyframes} from "styled-components";
import SignUp from "../../components/auth/SignUp.tsx";
import SignIn from "../../components/auth/SignIn.tsx";

const colorChange = keyframes`
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

const NavStyle = styled(Navbar)`
    a {
        margin: 2px;
        animation: ${colorChange} 3s infinite;

        &:hover {
            background-color: rgba(250, 250, 210, 0.5);
            color: rgba(250, 250, 210, 0.5);
            transform: scale(1.12);
            transition: color 0.5s;
            animation: none;
        }
    }
`;

const ImageStyle = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 10px;

    @media (max-width: 768px) {
        width: 20px;
        height: 20px;
    }
`;

const Navigation: React.FC = () => {
    return (
        <>
            <NavStyle bg="dark" data-bs-theme="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="https://github.com/spacedustz" target="_blank">
                            <ImageStyle src="../public/assets/profile/github.svg" alt="github"/>
                            Github</Nav.Link>
                        <Nav.Link href="https://iizz.tistory.com" target="_blank">
                            <ImageStyle src="../public/assets/profile/blog.svg" alt="blog"/>
                            Blog</Nav.Link>
                    </Nav>

                    <SignUp/>
                    <SignIn/>
                </Container>
            </NavStyle>
        </>
    );
}

export default Navigation;