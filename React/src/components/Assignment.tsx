import React from "react";
import {ListContainer} from "../styles/container/ListContainer.tsx";
import {ListItem} from "../styles/tabs/ListItem.tsx";
import styled from "styled-components";
import {ListGroupItem, Table} from "react-bootstrap";
import BaseBar from "../styles/bar/BaseBar.tsx";

const StyledTable = styled(Table)`
    table {
        border-collapse: collapse;
        margin-top: 20px;
        font-size: 14px;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: center;
        background-color: rgba(250, 250, 210, 0.3);
    }

    th {
        background-color: rgba(211, 211, 211, 0.3);
    }

    td:nth-child(1) {
        width: 20%;
    }

    td:nth-child(2) {
        width: 30%;
    }

    td:nth-child(3) {
        width: 20%;
    }

    ul {
        font-size: 14px;
    }

    li {
        text-align: left;
        list-style-type: square;
    }
`;

const FirstTitle = styled.h2`
    padding-left: 70%;
    padding-right: 70%;
    margin-bottom: 10px;
`;

const ListStyle = styled(ListGroupItem)`
    margin-bottom: 10px;
    line-height: 1.5;

    p {
        margin-bottom: 10px;
    }

    ul {
        padding-left: 20px;
    }

    ul li {
        margin-bottom: 5px;
    }
`;

const SubTd = styled.td`
    font-size: 12px;
    text-align: center;
`;

const Assignment: React.FC = () => {
    return (
        <ListContainer>
            <FirstTitle>과제 제출 현황</FirstTitle>
            <ListStyle>
                <ListItem variant="secondary">
                    <StyledTable striped bordered hover>
                        <thead>
                        <tr>
                            <th>날짜</th>
                            <th>과제</th>
                            <th>진행도</th>
                        </tr>
                        </thead>

                        <tbody>
                        <tr>
                            <SubTd>2024-01-01</SubTd>
                            <SubTd>
                                <ul>코드스테이츠</ul>
                                <li>링크dddddddddddddddddddddddddddddddddddddddddddddddddd</li>
                            </SubTd>
                            <SubTd><BaseBar num={20} /></SubTd>
                        </tr>

                        </tbody>
                    </StyledTable>
                </ListItem>
            </ListStyle>

        </ListContainer>
    );
};

export default Assignment;