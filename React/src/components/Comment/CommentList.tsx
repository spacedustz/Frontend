// CommentList.tsx
import React, {useState} from 'react';
import {CommentListProps} from "../../model/Comment.ts";
import styled from "styled-components";
import Pagination from "./Pagination.tsx";

const CommentStyle = styled.div`
    
    table {
        border-collapse: collapse;
        margin-top: 20px;
        font-size: 14px;
        margin: auto;
    }

    th, td {
        border: 1px solid #ddd;
        padding: 12px;
        text-align: center;
        background-color: rgba(250, 250, 210, 0.5);
    }

    th {
        background-color: rgba(211, 211, 211, 0.5);
    }

    td:nth-child(1) {
        width: 5%;
    }

    td:nth-child(2) { /* Comment column */
        width: 25%;
    }

    td:nth-child(3) { /* CreatedAt column */
        width: 10%;
    }
`;

const CommentList: React.FC<CommentListProps> = ({comments}) => {
    // 댓글 Pagination.tsx 구현
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const lastItemIdx = currentPage * itemsPerPage; // 현재 페이지 * 페이지당 댓글 개수 1 x 10
    const firstItemIdx = lastItemIdx - itemsPerPage; // 10 - 10
    const currentComments = comments.slice(firstItemIdx, lastItemIdx);

    const paginate = (pageNum: number) => setCurrentPage(pageNum);

    return (
        <CommentStyle>
            <table>
                <thead>
                <tr>
                    <th>댓글번호</th>
                    <th>댓글</th>
                    <th>작성일자</th>
                </tr>
                </thead>
                <tbody>
                {currentComments.map((comment, index) => (
                    <tr key={index}>
                        <td>{comment.id}</td>
                        <td>{comment.comment}</td>
                        <td>{comment.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>

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