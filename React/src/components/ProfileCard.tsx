import Card from 'react-bootstrap/Card';
import React from "react";
import CardContainer, {MainCard} from "../styles/container/CardContainer.ts";
import {NavImageStyle} from "../styles/container/NavigatinContainer.ts";
import styled from "styled-components";
import {NoteTextColor} from "../styles/animation/TextAnimation.ts";

const CardTitle = styled.a`
    animation: ${NoteTextColor} 3s infinite;
`;

const ProfileCard: React.FC = () => {
    return (
        <CardContainer>
            <MainCard style={{width: '20rem'}}>
                <Card.Img variant="top" src="../public/assets/profile/transparent-developer-black-skw.png" />
                <Card.Body>
                    <CardTitle href="https://github.com/spacedustz/Frontend" target="_blank">
                        <NavImageStyle src="../public/assets/profile/github.svg" alt="github" style={{width: "20px", height: "20px"}}/>
                        Github Repository
                    </CardTitle>
                </Card.Body>
            </MainCard>
        </CardContainer>
    );
}

export default ProfileCard;