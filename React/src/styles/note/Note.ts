import styled from "styled-components";
import {navColorChange} from "../container/NavigatinContainer.ts";

export const ButtonStyle = styled.button`
    border: 0 none;
    border-radius: 18px;
    background-color: rgba(107, 172, 206, 1);
    color: #fff;
    //width: 71px;
    //height: 36px;
    width: 7%;
    height: 5%;
    font-size: 12px;
    line-height: 38px;
    font-family: 'Spoqa Han Sans', sans-serif;
    margin: 11px 4px;
    padding: 0 16px;
    min-width: 54px;
    text-align: center;
    cursor: pointer;
    user-select: none;

    &:hover {
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        background-color: #f8f9fa;
        border: 1px solid #dadce0;
        color: #202124;
    }
    
    a {
        text-decoration: none;
        color: black;
    }
`;

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
    background-color: rgba(249, 249, 249, 0.1);
    padding: 20px;
    //max-width: 600px; /* 필요에 따라 조절 */
    margin: 20px;
    border-radius: 10px;
    width: 70%;
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
    
    h4 {
        color: white;
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
`;