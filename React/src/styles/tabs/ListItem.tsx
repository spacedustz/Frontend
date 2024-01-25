import styled from "styled-components";
import {ListGroupItem} from "react-bootstrap";

export const ListItem = styled(ListGroupItem)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgba(250, 250, 210, 0.5);
    border-radius: 10px;
    margin: 10px;

    strong {
        text-align: center;
        font-weight: bold;
        font-size: 18px;
        padding-bottom: 5px;
        padding-top: 5px;
    }

    p {
        font-size: 13px;
    }
`;