import styled from "styled-components";

export const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

export const StyledInput = styled.input`
    margin: 10px;
    padding: 5px;
    font-size: 16px;

    &:focus {
        outline: none;
        border: 1px solid orange;
        box-shadow: 0 0 5px orange;
    }

    &::placeholder {
        color: rgba(30, 30, 30, 0.7);
        font-weight: 300;
        font-size: 15px;
        padding-left: 10px;
    }
`;

export const StyledButton = styled.button`
    padding: 5px 10px;
    font-size: 16px;
    background-color: #4CAF50; /* Green */
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 4px 2px;
    transition-duration: 0.4s;
    cursor: pointer;

    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`;