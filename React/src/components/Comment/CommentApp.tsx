import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentApp: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const webSocketRef = useRef<WebSocket | null>(null); // 추가
    const server = 'ws://43.202.203.180:8080'
    const local = 'ws://localhost:8080'

    useEffect(() => {
        webSocketRef.current = new WebSocket(local + '/api/comment');

        webSocketRef.current.onopen = () => {
            console.log('WebSocket 연결 완료');
        };

        webSocketRef.current.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            setComments(dataFromServer);
        };

        webSocketRef.current.onerror = (error) => {
            console.error(`WebSocket 오류: ${error}`);
        };

        return () => {
            if (webSocketRef.current) {
                webSocketRef.current.close();
            }
        };
    }, []);

    const handleAddComment = async (comment: string) => {
        try {
            const response = await axios.post(local + '/api/comments', { comment });
            const newComment = response.data;
            setComments((prevComments) => [...prevComments, newComment]);
        } catch (error) {
            console.error('댓글 추가 오류:', error);
        }
    };

    return (
        <div>
            <CommentForm onAddComment={handleAddComment} />
            <CommentList comments={comments}/>
        </div>
    );
};

export default CommentApp;