import {keyframes} from "styled-components";

export const TextAnimation = keyframes`
    //0% {
    //    background-color: rgba(250, 250, 210, 0);
    //    color: rgba(250, 250, 210, 0.5);
    //}
    //50% {
    //    background-color: rgba(250, 250, 210, 0);
    //    color: rgba(250, 250, 210, 0.8);
    //}
    //100% {
    //    background-color: rgba(250, 250, 210, 0);
    //    color: rgba(250, 250, 210, 0.5);
    //}
    0% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(177, 50, 170, 0.84);
    }

    25% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(177, 50, 110, 0.84);
    }
    
    50% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(70, 100, 210, 0.72);
    }

    75% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(110, 90, 210, 1);
    }
    
    100% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(110, 120, 210, 1);
    }
`;

export const NoteTextColor = keyframes`
    0% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(177, 70, 170, 0.84);
    }
    50% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(70, 100, 210, 0.72);
    }
    100% {
        background-color: rgba(250, 250, 210, 0);
        color: rgba(130, 60, 210, 1);
    }
`;