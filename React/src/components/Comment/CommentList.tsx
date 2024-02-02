import React, {useState, useEffect, useRef} from 'react';
import {Client, Frame} from '@stomp/stompjs';
import Pagination from "./Pagination.tsx";
import {Comment} from "../../model/Comment.ts";
import {getAllComments} from "../../model/Api.ts";
import {
    CommentActions,
    CommentAuthor,
    CommentAuthorAndTime, CommentDescription,
    CommentItem,
    CommentStyle, CommentTime,
    CommentTop,
    CommentUserType, DeleteButton, EditButton
} from "../../styles/comment/List.ts";

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
            brokerURL: import.meta.env.VITE_SOCKET_URL,
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
                    setComments(receivedComments);
                }
            });

            console.log("WebSocket 세션이 [생성] 되었습니다.");
        };

        stompClient.activate();
    };

    const fetchComments = async () => {
        const result = await getAllComments();
        if (result.data && Array.isArray(result.data)) {
            setComments(result.data);
        }
    };

    const init = async (): Promise<void> => {
        connectWebSocket();
        await fetchComments();
    };

    useEffect(() => {
        init().catch(error => console.error("WebSocket 연결 실패 : ", error))

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current?.deactivate();
                console.log("WebSocket 세션이 [종료] 되었습니다.");
            }
        };
    }, []);

    const lastItemIdx = currentPage * itemsPerPage; // 현재 페이지 * 페이지당 댓글 개수 1 x 10
    const firstItemIdx = lastItemIdx - itemsPerPage; // 10 - 10
    const currentComments: Comment[] = comments.slice(firstItemIdx, lastItemIdx);

    const paginate = (pageNum: number) => setCurrentPage(pageNum);

    return (
        <CommentStyle>
            {currentComments.map((comment, index) => (
                <CommentItem key={index}>
                    <CommentTop>
                        <CommentAuthorAndTime>
                            <CommentAuthor>{comment.userName}</CommentAuthor>
                            <CommentUserType>{comment.userType}</CommentUserType>
                            <CommentTime>{comment.createdAt}</CommentTime>
                        </CommentAuthorAndTime>
                        <CommentActions>
                            <EditButton>수정</EditButton>
                            <DeleteButton>삭제</DeleteButton>
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
