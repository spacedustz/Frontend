import styled from "styled-components";
import {NoteTextColor} from "../animation/TextAnimation.ts";

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
    background-color: rgba(49, 49, 49, 0.1);
    //max-width: 600px; /* 필요에 따라 조절 */
    padding-top: 20px;
    margin: 15px;
    border-radius: 10px;
`;

export const Title = styled.div`
    text-align: center;
    color: black;
    font-size: 1.5em;
    text-decoration: none;
    
    h4 {
        font-size: 1.7rem;
        margin-top: 13%;
    }
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
        //border-bottom: 2px solid rgba(20,20,20,0.65); 
        color: rgba(40,40,40,0.9);
        padding-left: 3px;
        font-weight: bold;
        padding-bottom: 4px;
        font-size: 17px;
    }

    a {
        margin: 2px;
        animation: ${NoteTextColor} 3s infinite;
        text-decoration: none;
        position: relative;
        right: 20px;

        &:hover {
            background-color: rgba(250, 250, 210, 0);
            transform: scale(1.12);
            transition: color 0.5s;
            animation: none;
            text-decoration: none;
        }
        
        @media (max-width: 768px) {
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
            font-size: 12px;
        }

        h4 {
            font-size: 15px;
            //border-bottom: 2px solid rgba(20,20,20,0.65);
            color: white;
            padding-left: 3px;
            font-weight: bold;
            padding-bottom: 4px;
        }

        a {
            margin: 1px;
            animation: ${NoteTextColor} 3s infinite;
            text-decoration: none;

            &:hover {
                background-color: rgba(250, 250, 210, 0);
                transform: scale(1.12);
                transition: color 0.5s;
                animation: none;
                text-decoration: none;
            }
        }
    }
`;

export const PostButton = styled.button`
    background-color: rgba(76, 175, 80, 0.5);
    border: none;
    border-radius: 15px;
    height: 5%;
    color: white;
    text-align: center;
    display: inline-block;
    font-size: 13px;
    margin: 4px 2px;
    cursor: pointer;
    transition-duration: 0.4s;
`;

export const DeleteButton = styled.button`
    background-color: rgba(76, 175, 80, 0.3);
    border: none;
    border-radius: 15px;
    color: white;
    text-align: center;
    display: inline-block;
    font-size: 13px;
    margin: 4px 2px 5px 5px;
    cursor: pointer;
    transition-duration: 0.4s;
`;