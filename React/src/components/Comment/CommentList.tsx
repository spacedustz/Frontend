import React, {useState} from 'react';
import Pagination from "./Pagination.tsx";
import {Comment, CommentListProps} from "../../model/Comment.ts";
import {
    CommentActions,
    CommentAuthor,
    CommentAuthorAndTime, CommentDescription,
    CommentItem,
    CommentStyle, CommentTime,
    CommentTop,
    CommentUserType, DeleteButton, EditButton
} from "../../styles/comment/List.ts";

const CommentList: React.FC<CommentListProps> = ({ comments, onEditComment, onDeleteComment }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [newComment, setNewComment] = useState<string>('');
    const itemsPerPage = 7;
    const lastItemIdx = currentPage * itemsPerPage;
    const firstItemIdx = lastItemIdx - itemsPerPage;
    const currentComments: Comment[] = comments.slice(firstItemIdx, lastItemIdx);
    const paginate = (pageNum: number) => setCurrentPage(pageNum);

    // 수정 버튼 클릭 시 처리
    const handleEditButtonClick = (commentId: number, description: string) => {
        setEditingCommentId(commentId);
        setNewComment(description);
    };

    const handleCompleteButtonClick = () => {
        if(editingCommentId !== null) {
            onEditComment(editingCommentId, newComment);  // 변경된 부분
        }
        setEditingCommentId(null);
        setNewComment('');
    };

    // 취소 버튼 클릭 시 처리
    const handleCancelButtonClick = () => {
        setEditingCommentId(null);
        setNewComment('');
    };

    return (
        <CommentStyle>
            {currentComments.map((comment, index) => (
                <CommentItem key={index}>
                    <CommentTop>
                        <CommentAuthorAndTime>
                            <CommentAuthor>{comment.userName}</CommentAuthor>
                            <CommentUserType $userType={comment.userType}>{comment.userType}</CommentUserType>
                            <CommentTime>{comment.createdAt}</CommentTime>
                        </CommentAuthorAndTime>

                        <CommentActions>
                            {editingCommentId === comment.commentId ? (
                                <>
                                    <EditButton onClick={handleCompleteButtonClick}>완료</EditButton>
                                    <DeleteButton onClick={handleCancelButtonClick}>취소</DeleteButton>
                                </>
                            ) : (
                                <CommentActions>
                                    <EditButton onClick={() => handleEditButtonClick(comment.commentId, comment.description)}>수정</EditButton>
                                    <DeleteButton onClick={() => onDeleteComment(comment.commentId)}>삭제</DeleteButton>
                                </CommentActions>
                            )}
                        </CommentActions>
                    </CommentTop>

                    {editingCommentId === comment.commentId ? (
                        <input type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                    ) : (
                        <CommentDescription>{comment.description}</CommentDescription>
                    )}
                </CommentItem>
            ))}
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={comments.length}
                currentPage={currentPage}
                paginate={paginate}
            />
        </CommentStyle>
    );
};

export default CommentList;
