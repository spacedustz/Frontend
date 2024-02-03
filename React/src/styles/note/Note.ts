import styled from "styled-components";
import {navColorChange} from "../container/NavigatinContainer.ts";

export const RootContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
`;

export const SubContainer = styled.div`
    text-align: center;
    font-family: Arial, sans-serif;
    color: #333;
    border: 1px solid orange;
    background-color: rgba(249, 249, 249, 0.1);
    padding: 20px;
    //max-width: 600px; /* 필요에 따라 조절 */
    margin: 20px;
    border-radius: 10px;
`;

export const Title = styled.div`
    text-align: center;
    color: white;
    font-size: 1.5em;
    margin-bottom: 20px;
    text-decoration: none;
`;

export const ListContainer = styled.div`
    display: flex;
    justify-content: space-around;
`;

export const List = styled.div`
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
    font-size: 15px;
    
    li {
        text-align: left;
        margin-top: 20px;
        list-style-type: none;
    }
    
    h4 {
        color: rgba(66, 126,214, 0.7);
        padding-left: 3px;
        font-weight: bold;
    }

    a {
        margin: 2px;
        animation: ${navColorChange} 3s infinite;
        text-decoration: none;

        &:hover {
            background-color: rgba(250, 250, 210, 0);
            color: rgba(250, 250, 210, 0.5);
            transform: scale(1.12);
            transition: color 0.5s;
            animation: none;
            text-decoration: none;
        }
    }
    
    @media (max-width: 768px) {
        padding: 15px;
        margin-bottom: 20px;
        border-radius: 5px;
        font-size: 10px;

        li {
            text-align: left;
            margin-top: 20px;
            list-style-type: none;
        }

        h4 {
            font-size: 15px;
            color: rgba(66, 126,214, 0.7);
            padding-left: 3px;
            font-weight: bold;
        }

        a {
            margin: 1px;
            animation: ${navColorChange} 3s infinite;
            text-decoration: none;

            &:hover {
                background-color: rgba(250, 250, 210, 0);
                color: rgba(250, 250, 210, 0.5);
                transform: scale(1.12);
                transition: color 0.5s;
                animation: none;
                text-decoration: none;
            }
        }
    }
`;