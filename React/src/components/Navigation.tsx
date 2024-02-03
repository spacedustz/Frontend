import Nav from 'react-bootstrap/Nav';
import React from "react";
import SignIn from "./auth/SignIn.tsx";
import {NavImageStyle, NavSignInStyle, NavStyle} from "../styles/container/NavigatinContainer.ts";
import {useNavigate} from "react-router-dom";

const Navigation: React.FC = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/')
    }

    return (
        <NavStyle bg="dark" data-bs-theme="dark">
            <Nav className="me-auto">
                <Nav.Link onClick={handleClick}>
                    <NavImageStyle src="../public/assets/home.png" alt="github" />
                    Home
                </Nav.Link>

                <Nav.Link href="https://github.com/spacedustz" target="_blank">
                    <NavImageStyle src="../public/assets/profile/github.svg" alt="github"/>
                    Github</Nav.Link>

                <Nav.Link href="https://iizz.tistory.com" target="_blank">
                    <NavImageStyle src="../public/assets/profile/blog.svg" alt="blog"/>
                    Blog</Nav.Link>
            </Nav>

            <NavSignInStyle>
                <SignIn/>
            </NavSignInStyle>
        </NavStyle>
    );
}

export default Navigation;