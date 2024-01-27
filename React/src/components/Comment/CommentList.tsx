import React, {useState, useEffect, useRef} from 'react';
import {Client, Frame} from '@stomp/stompjs';
import styled from "styled-components";
import Pagination from "./Pagination.tsx";
import {Comment} from "../../model/Comment.ts";
import {getAllComments} from "../../model/Api.ts";

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

const CommentList: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const stompClientRef = useRef<Client | null>(null);
    const itemsPerPage = 7;

    const connectWebSocket = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            return; // 이미 연결된 경우 종료
        }

        const stompClient = new Client({
            brokerURL: 'ws://localhost:8080/ws',
            // debug: function (str) {
            //     console.log('WebSocket 연결 중 ... : ' + str);
            // },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = function () {
            stompClientRef.current = stompClient;

            stompClient.subscribe("/api/comment/list", (frame: Frame) => {
                if (frame.body) {
                    const receivedComments: Comment[] = JSON.parse(frame.body);

                    const newComments: Comment[] = receivedComments.map((comment: Comment) => ({
                        commentId: comment.commentId,
                        description: comment.description,
                        createdAt: comment.createdAt,
                        userId: comment.userId,
                        userName: comment.userName,
                        password: comment.password,
                        userType: comment.userType,
                        userCreatedAt: comment.userCreatedAt,
                    }));

                    setComments(newComments);
                }
            });

            console.log("[댓글 기능] WebSocket 세션이 생성 되었습니다.");
        };

        stompClient.activate();
    };

    const fetchComments = async () => {
        const result = await getAllComments();
        if (result.data) {
            const comments: Comment[] = result.data.map((comment: any) => ({
                commentId: comment.id,
                description: comment.description,
                createdAt: comment.createdAt,
                userId: comment.user.id,
                userName: comment.user.name,
                password: comment.user.password,
                userType: comment.user.type,
                userCreatedAt: comment.user.createdAt,
            }));
            setComments(comments);
        }
    };

    const init = async (): Promise<void> => {
        await connectWebSocket();
        fetchComments();
    };

    useEffect(() => {
        init()

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current?.deactivate();
                console.log("[댓글 기능] WebSocket 세션이 종료 되었습니다.");
            }
        };
    }, []);

    const lastItemIdx = currentPage * itemsPerPage; // 현재 페이지 * 페이지당 댓글 개수 1 x 10
    const firstItemIdx = lastItemIdx - itemsPerPage; // 10 - 10
    const currentComments: Comment[] = comments.slice(firstItemIdx, lastItemIdx);

    const paginate = (pageNum: number) => setCurrentPage(pageNum);

    return (
        <CommentStyle>
            <table>
                <thead>
                <tr>
                    <th>작성자</th>
                    <th>내용</th>
                    <th>작성일</th>
                </tr>
                </thead>
                <tbody>
                {currentComments.map((comment, index) => (
                    <tr key={index}>
                        <td>{comment.userName}</td>
                        <td>{comment.description}</td>
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
