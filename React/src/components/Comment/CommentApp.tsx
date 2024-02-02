import React, {useEffect, useRef, useState} from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import {deleteComment, getAllComments, modifyComment} from "../../model/Api.ts";
import {Client, Frame} from "@stomp/stompjs";
import {Comment} from "../../model/Comment.ts";

const CommentApp: React.FC = () => {
    const [newComment, setNewComment] = useState<string>('');
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const stompClientRef = useRef<Client | null>(null);

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

    /* 댓글 수정 & 삭제 */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleEditComment = async () => {
        if (isEditing && editingCommentId !== null) {
            const jwt = localStorage.getItem('jwt');
            if (!jwt) {
                alert('비밀번호가 저장되지 않았습니다.');
                return;
            }

            const requestData = {
                commentId: editingCommentId,
                newDescription: newComment,
                jwt
            };

            try {
                const response = await modifyComment(requestData);
                if (response.status === 200) {
                    alert('댓글이 수정되었습니다.');
                    console.log('댓글 수정 완료')

                    setIsEditing(false);
                    setNewComment('');
                    setEditingCommentId(null);

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
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) {
            alert('비밀번호가 저장되지 않았습니다.');
            return;
        }

        const requestData = {
            commentId,
            jwt
        };

        try {
            const response = await deleteComment(requestData);
            if (response.status === 200) {
                console.log('댓글 삭제 완료')
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
                onSubmitComment={isEditing ? handleEditComment : handleEditComment}
                isEditing={isEditing}
            />
            <CommentList
                comments={comments}
                onEditComment={(commentId, comment) => {
                    setIsEditing(true);
                    setEditingCommentId(commentId);
                    setNewComment(comment);
                }}
                onDeleteComment={handleDeleteComment}
            />
        </div>
    );
};

export default CommentApp;