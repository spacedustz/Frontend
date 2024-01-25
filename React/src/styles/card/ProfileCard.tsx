import Card from 'react-bootstrap/Card';
import React from "react";
import {Container} from "react-bootstrap";
import styled, {keyframes} from "styled-components";

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
        color: rgba(250, 250, 210, 0.9);
    }
`;

const CardContainer = styled(Container)`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;

    img {
        width: 200px;
    }

    a {
        text-decoration: none;
        color: cadetblue;
        font-weight: 700;

        &:hover {
            transform: scale(1.12);
            transition: color 0.5s;
        }
    }

    div, h5, h6 {
        font-weight: bold;
        color: white;
        animation: ${colorChange} 3s infinite;
    }
`;

const MainCard = styled(Card)`
    background: transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h5`
    font-size: 20px;
`;


const ProfileCard: React.FC = () => {
    return (
        <CardContainer>
            <MainCard style={{width: '20rem'}}>
                <Card.Img variant="top" src="../../public/assets/javascript.jpg"/>
                <Card.Body>
                    <Title>😺 신건우 😺</Title><br/>
                    <strong>과제 제출 사이트 입니다.</strong><br/>
                    <strong>spacedustw@gmail.com</strong>
                </Card.Body>
            </MainCard>
        </CardContainer>
    );
}

export default ProfileCard;