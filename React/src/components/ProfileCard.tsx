import Card from 'react-bootstrap/Card';
import React from "react";
import CardContainer, {CardTitle, MainCard} from "../styles/container/CardContainer.ts";

const ProfileCard: React.FC = () => {
    return (
        <CardContainer>
            <MainCard style={{width: '20rem'}}>
                <Card.Img variant="top" src="https://techstack-generator.vercel.app/react-icon.svg"/>
                <Card.Body>
                    <CardTitle>😺 신건우 😺</CardTitle><br/>
                    <strong>Frontend & React</strong><br/>
                    <strong>학습 기록 사이트</strong>
                </Card.Body>
            </MainCard>
        </CardContainer>
    );
}

export default ProfileCard;