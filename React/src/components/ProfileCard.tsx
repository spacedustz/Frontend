import Card from 'react-bootstrap/Card';
import React from "react";
import CardContainer, {MainCard} from "../styles/container/CardContainer.ts";

const ProfileCard: React.FC = () => {
    return (
        <CardContainer>
            <MainCard style={{width: '20rem'}}>
                {/*<Card.Img variant="top" src="https://techstack-generator.vercel.app/react-icon.svg"/>*/}
                <Card.Img variant="top" src="../public/assets/profile/profile-logo.png" />
                <Card.Body>
                    <strong>Frontend 학습 기록</strong><br/>
                    <a href="https://github.com/spacedustz/Frontend" target="_blank">View Repository</a>
                </Card.Body>
            </MainCard>
        </CardContainer>
    );
}

export default ProfileCard;