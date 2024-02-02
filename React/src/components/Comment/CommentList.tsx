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
    const itemsPerPage = 7;
    const lastItemIdx = currentPage * itemsPerPage;
    const firstItemIdx = lastItemIdx - itemsPerPage;
    const currentComments: Comment[] = comments.slice(firstItemIdx, lastItemIdx);
    const paginate = (pageNum: number) => setCurrentPage(pageNum);

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
                            <EditButton onClick={() => onEditComment(comment.commentId, comment.description)}>수정</EditButton>
                            <DeleteButton onClick={() => onDeleteComment(comment.commentId)}>삭제</DeleteButton>
                        </CommentActions>
                    </CommentTop>

                    <CommentDescription>{comment.description}</CommentDescription>
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
