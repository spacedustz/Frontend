import styled from "styled-components";

export const CommentFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InputStyle = styled.input`
    width: 30%;
    height: 50px;
    border: 1px solid #dfe1e5;
    background-color: rgba(56, 61, 63, 0.4);
    color: white;
    text-align: center;
    font-size: 12px;
    
    &::placeholder {
        color: rgba(230, 230, 230, 0.7);
        font-weight: 300;
    }
    
    @media (max-width: 768px) {
        width: 70%;
    }
`;

export const FormHeader = styled.h3`
    color: white;
`;

export const ButtonStyle = styled.button`
    border: 0 none;
    border-radius: 18px;
    background-color: rgba(107, 172, 206, 1);
    color: #fff;
    width: 71px;
    height: 36px;
    font-size: 13px;
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
`;