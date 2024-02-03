import React, {useEffect, useRef, useState} from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import {deleteComment, getAllComments, modifyComment} from "../../model/Api.ts";
import {Client, Frame} from "@stomp/stompjs";
import {Comment} from "../../model/Comment.ts";

const CommentApp: React.FC = () => {
    // 댓글의 새로운 내용을 저장하는 상태
    const [newComment, setNewComment] = useState<string>('');
    // 전체 댓글 목록을 저장하는 상태
    const [comments, setComments] = useState<Comment[]>([]);
    // WebSocket 연결 관리
    const stompClientRef = useRef<Client | null>(null);

    // 댓글이 현재 편집 중인지 아닌지를 나타내는 상태
    // const [isEditing, setIsEditing] = useState<boolean>(false);
    // 현재 편집 중인 댓글의 ID를 저장하는 상태
    // const [editingCommentId, setEditingCommentId] = useState<number | null>(null);

    /* WebSocket */
    const connectWebSocket = () => {
        if (stompClientRef.current && stompClientRef.current.connected) {
            return;
        }

        const stompClient = new Client({
            brokerURL: import.meta.env.VITE_SOCKET_URL,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });

        stompClient.onConnect = function () {
            stompClientRef.current = stompClient;

            stompClient.subscribe("/comment/list", (frame: Frame) => {
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

    /* 댓글 수정 & 삭제 */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleEditComment = async (commentId: number, newDescription: string) => {
        // if (isEditing && editingCommentId !== null) {
        const jwt = sessionStorage.getItem('jwt')
        const username = sessionStorage.getItem('username')

        if (!jwt) {
            alert('로그인 후 수정 가능합니다.');
            return;
        }

        if (!username) {
            alert('댓글을 작성한 유저 정보가 일치하지 않습니다.');
            return;
        }

            const requestData = {
                commentId: commentId,
                newDescription: newDescription,
                jwt
            };

            try {
                const response = await modifyComment(requestData);

                if (response.status === 200) {
                    alert('댓글이 수정되었습니다.');

                    const name = sessionStorage.getItem('username')
                    console.log(`${name}님 댓글 수정  - 수정 내용 : ${newDescription}`)
                    setNewComment('');
                    // setIsEditing(false);
                    // setEditingCommentId(null);

                    const updatedComments = await getAllComments();

                    if (updatedComments.data && Array.isArray(updatedComments.data)) {
                        setComments(updatedComments.data);
                    }
                } else {
                    alert('비밀번호가 틀립니다.');
                }
            } catch (error) {
                console.error('댓글 수정 에러:', error);
            }
        // }
    };

    const handleDeleteComment = async (commentId: number) => {
        const jwt = sessionStorage.getItem('jwt')
        const username = sessionStorage.getItem('username')

        if (!jwt) {
            alert('로그인 후 삭제 가능합니다.');
            return;
        }

        if (!username) {
            alert('댓글을 작성한 유저 정보가 일치하지 않습니다.');
            return;
        }

        const requestData = {
            commentId,
            jwt
        };

        try {
            const response = await deleteComment(requestData);

            if (response.status === 200) {
                const name = sessionStorage.getItem('username')
                console.log(`${name}님 댓글 삭제 완료`)
                alert('댓글이 삭제되었습니다.');

                const updatedComments = await getAllComments();

                if (updatedComments.data && Array.isArray(updatedComments.data)) {
                    setComments(updatedComments.data);
                }
            } else {
                alert('비밀번호가 틀립니다.');
            }
        } catch (error) {
            console.error('댓글 삭제 에러:', error);
        }
    };

    return (
        <div>
            <CommentForm
                newComment={newComment}
                onInputChange={handleInputChange}
            />
            <CommentList
                comments={comments}
                onEditComment={handleEditComment}
                onDeleteComment={handleDeleteComment}
            />
        </div>
    );
};

export default CommentApp;