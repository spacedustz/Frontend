import styled from "styled-components";
import {Container} from "react-bootstrap";

export const ListContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        margin-top: 50px;
        padding-left: 10%;
        padding-right: 10%;
        color: khaki;
    }
`;