import Nav from 'react-bootstrap/Nav';
import React from "react";
import SignIn from "./auth/SignIn.tsx";
import {NavImageStyle, NavSignInStyle, NavStyle} from "../styles/container/NavigatinContainer.ts";

const Navigation: React.FC = () => {
    return (
        <NavStyle bg="dark" data-bs-theme="dark">
            <Nav className="me-auto">
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