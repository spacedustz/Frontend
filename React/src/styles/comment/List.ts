import styled from "styled-components";

export const CommentStyle = styled.div`
    font-size: 14px;
    margin: auto;
    display: flex;
    flex-direction: column;
    width: 50%;
`;

export const CommentItem = styled.div`
    border-bottom: 1px solid #ddd;
    padding: 12px;
    margin-bottom: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    font-family: 'Spoqa Han Sans', sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
`;

export const CommentTop = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CommentAuthorAndTime = styled.div`
    display: flex;
    justify-content: flex-start;
`;

export const CommentAuthor = styled.div`
    font-weight: bold;
    font-size: 17px;
    margin: 10px;
`;

export const CommentUserType = styled.span`
    font-weight: bold;
    font-size: 13px;
    border: 1px solid gray;
    border-radius: 10px;
    width: 60px;
    height: 25px;
    margin-top: 10px;
`;

export const CommentTime = styled.div`
    margin: 10px;
    font-weight: 300;  // 글씨 두께를 보통보다 약간 얇게 설정
    font-size: 0.8em;  // 글씨 크기를 작게 설정
    color: rgba(200, 200, 200, 0.8);  // 연한 회색으로 설정
`;

export const CommentActions = styled.div`
    margin-left: 10px;
`;

export const EditButton = styled.button`
    border: none;
    border-radius: 5px;
    background-color: rgba(76, 175, 80, 0.5);
    color: white;
    cursor: pointer;
    margin-right: 5px;
    width: auto;
    height: auto;
    font-size: 10px;
    
    &:hover {
        background-color: rgba(76, 175, 80, 1);
    }
`;

export const DeleteButton = styled.button`
    border: none;
    border-radius: 5px;
    background-color: rgba(244, 67, 54, 0.5);
    color: white;
    cursor: pointer;
    width: auto;
    height: auto;
    font-size: 10px;
    
    &:hover {
        opacity: 0.8;
        background-color: rgba(244, 67, 54, 1);
    }
`;

export const CommentDescription = styled.div`
    display: flex;
    align-items: center;
    height: auto;
    white-space: normal;
    margin-left: 20px;
    margin-right: 30%;
`;