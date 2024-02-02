import styled from "styled-components";
import {Container} from "react-bootstrap";

export const IntroContainer = styled(Container)`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    font-family: 'Arial', sans-serif;
    color: #333;

    div {
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
        padding: 20px;
        line-height: 1.5;
        word-wrap: normal;
        background-color: rgba(250, 250, 210, 0.5);
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    }
    
    h3 {
        color: khaki;
        margin-bottom: 30px;
    }
`;