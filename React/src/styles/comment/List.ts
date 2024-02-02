import styled, {css, keyframes} from "styled-components";

export const CommentStyle = styled.div`
    font-size: 14px;
    margin: auto;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {  // 화면 크기가 768px 이상인 경우
        width: 50%;
    }
`;

export const CommentItem = styled.div`
    border-bottom: 1px solid #ddd;
    padding: 12px;
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

    @media (max-width: 768px) {  // 화면 크기가 768px 이하인 경우
        font-size: 12px;
        margin: 5px;
    }
`;

const colorAnimation = keyframes`
    0% { background-color: rgba(255, 105, 97, 0.7); }  // 연한 빨강
    50% { background-color: rgba(70, 130, 180, 0.7); }  // 파랑
    100% { background-color: rgba(147, 112, 219, 0.7); }  // 보라색
`;

type CommentUserTypeProps = {
    $userType: string;
}

export const CommentUserType = styled.span<CommentUserTypeProps>`
    font-weight: bold;
    font-size: 13px;
    border: 1px solid gray;
    border-radius: 10px;
    width: 60px;
    height: 25px;
    margin-top: 10px;
    animation: ${props => props.$userType === '개발자' ? css`${colorAnimation} 3s linear infinite` : 'none'};

    @media (max-width: 768px) {  // 화면 크기가 768px 이하인 경우
        font-size: 10px;
        width: 50px;
        height: 20px;
        margin-top: 5px;
    }
`;

export const CommentTime = styled.div`
    margin: 10px;
    font-weight: 300;
    font-size: 0.8em;
    color: rgba(200, 200, 200, 0.8);

    @media (max-width: 768px) {  // 화면 크기가 768px 이하인 경우
        font-size: 0.6em;
        margin: 5px;
    }
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
    margin-right: 15%;

    @media (max-width: 768px) {  // 화면 크기가 768px 이하인 경우
        font-size: 0.7em;
        margin: 5px;
    }
`;