import React from 'react';
import {postComment} from "../../model/Api.ts";
import {ButtonStyle, CommentFormContainer, FormHeader, InputStyle} from "../../styles/comment/Form.ts";
import {CommentFormProps} from "../../model/Comment.ts";

const CommentForm: React.FC<CommentFormProps> = ({ newComment, onInputChange }) => {
    const handleAddComment = async () => {
        if (newComment.trim() !== '') {
            try {
                await postComment(newComment);
                onInputChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);

                const name = sessionStorage.getItem('username')
                console.log(`${name}님 댓글 작성 완료 - 작성 내용 : ${newComment}`)
            } catch (error) {
                alert('댓글은 로그인 후 작성 가능합니다.');
                console.error('댓글 추가 - Authorization Failed:', error);
            }
        } else {
            alert('빈 값은 전송이 안됩니다!');
        }
    };

    return (
        <CommentFormContainer>
            <FormHeader>🐣 Guest Book 🐣 </FormHeader>
            <InputStyle
                type="text"
                value={newComment}
                onChange={onInputChange}
                placeholder="여러분의 소중한 댓글을 입력해주세요."
                maxLength={120}
            />
            <ButtonStyle onClick={handleAddComment}>Send</ButtonStyle>
        </CommentFormContainer>
    );
};

export default CommentForm;