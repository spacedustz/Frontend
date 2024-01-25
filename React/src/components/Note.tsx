import React from "react";
import ListGroup from 'react-bootstrap/ListGroup';
import styled from "styled-components";
import {ListContainer} from "../styles/container/ListContainer.tsx";
import {ListItem} from "../styles/tabs/ListItem.tsx";

const FirstH2 = styled.h2`
    padding-left: 70%;
    padding-right: 70%;
    margin-bottom: 10px;
`;

const Note: React.FC = () => {
    return (
        <ListContainer>
            <FirstH2>공부 노트</FirstH2>
            <ListGroup>
                <ListItem variant="secondary">
                    <strong>JavaScript 기본 문법</strong>
                    <li>ddddddddddddddddddddddddddddddddddddddd</li>
                </ListItem>

            </ListGroup>
        </ListContainer>
    );
};

export default Note;