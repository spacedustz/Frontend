import React, {useState} from 'react';
import {postComment} from "../../model/Api.ts";
import {ButtonStyle, CommentFormContainer, FormHeader, InputStyle} from "../../styles/comment/Form.ts";

const CommentForm: React.FC = () => {
    const [newComment, setNewComment] = useState<string>('');

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
            } catch (error) {
                alert('댓글은 로그인 후 작성 가능합니다.');
                console.error('댓글 추가 - Authorization Failed:', error);
            }
        } else {
            alert('빈 값은 전송이 안됩니다! 하하하');
        }
    };

    return (
        <CommentFormContainer>
            <FormHeader>🐣 Guest Book 🐣 </FormHeader>
            <InputStyle
                type="text"
                value={newComment}
                onChange={handleInputChange}
                placeholder="여러분의 소중한 댓글을 입력해주세요."
            />
            <ButtonStyle onClick={handleAddComment}>Send</ButtonStyle>
        </CommentFormContainer>
    );
};

export default CommentForm;