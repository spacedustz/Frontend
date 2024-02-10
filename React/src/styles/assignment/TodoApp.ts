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
    border: none;
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
    width: 100%;
    background-color: rgba(250, 250, 250, 0.8);
`;

export const HeaderTab = styled.div`
    display: flex;
    border-bottom: 1px solid lightgray;
    position: relative;
`;

export const Tab = styled.div`
    padding: 1em;
    cursor: pointer;
`;

export const UnderLine = styled.div<{tab: string}>`
    width: 64px;
    height: 3px;
    background-color: lightseagreen;
    position: absolute;
    left: ${props => props.tab === '전체' ? '0px' : props.tab === '진행중' ? '75px' : '143px'};
    top: 50px;
    padding: 0;
    transition: left 0.5s ease-in-out;
`;

export const Tasks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
    width: 100%;
    border-bottom: 1px solid rgba(30,30,30,0.7);
`;

export const DoneTasks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 1em;
    width: 100%;
    border-bottom: 1px solid rgba(30,30,30,0.7);
`;

export const DoneContent = styled.div`
    background-color: lightslategrey;
    flex-grow: 1;
    padding-right: 1em;
`;

export const DoneTitle = styled.div`
    text-decoration: line-through;
    width: 100%;
    margin-right: 1%;
    
    @media (max-width: 768px) {
        width: 100%;
    }
`;

export const StyledImage = styled.img`
    height: 20px;
    width: 20px;
`;