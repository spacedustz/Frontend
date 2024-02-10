import styled from "styled-components";

export const TodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
export const HeaderSection = styled.section`
    border: 1px solid lightgray;
`;

export const HeaderTab = styled.div`
    display: flex;
    border-bottom: 1px solid lightgray;
    position: relative;
`;

export const Tab = styled.div`
    padding: 1em;
`;

export const UnderLine = styled.div`
    width: 50px;
    height: 1px;
    background-color: pink;
    position: absolute;
    left: 0;
    top: 50px;
    padding: 0;
`;

export const Tasks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
`;