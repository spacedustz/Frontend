import React, {useState} from 'react';
import styled from "styled-components";
import {postComment} from "../../model/Api.ts";

const InputStyle = styled.input`
    border-radius: 5px;
    width: 200px;
    height: 22px;
    border: 1px solid #dfe1e5;
    text-align: center;
    font-size: 12px;
`;

const ButtonStyle = styled.button`
    border: 1px solid;
    border-radius: 4px;
    font-family: Apple SD Gothic Neo,arial,sans-serif;
    font-size: 14px;
    margin: 11px 4px;
    padding: 0 16px;
    line-height: 27px;
    height: 32px;
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

const CommentForm: React.FC = () => {
    const [newComment, setNewComment] = useState<string>('');
    const [userName, setUserName] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target && event.target.value !== null && event.target.value !== undefined) {
            setNewComment(event.target.value);
        }
    };

    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            try {
                await postComment(newComment); // postComment 함수를 직접 호출
                setNewComment('');
                setUserName('');
            } catch (error) {
                alert('댓글은 로그인 후 작성 가능합니다.');
                console.error('댓글 추가 - Authorization Failed:', error);
            }
        } else {
            alert('빈 값은 전송이 안됩니다! 하하하');
        }
    };

    return (
        <div>
            <h3>🐣 피드백 추가🐣 </h3>
            <InputStyle
                type="text"
                value={newComment}
                onChange={handleInputChange}
                placeholder="피드백을 입력해주세요!!"
            />
            <ButtonStyle onClick={handleAddComment}>추가</ButtonStyle>
        </div>
    );
};

export default React.memo(CommentForm);