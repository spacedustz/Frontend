import React, { useState, useEffect } from 'react';
import CommentForm from "./CommentForm.tsx";
import CommentList from "./CommentList.tsx";
import axios from 'axios';
import {Comment} from "../../model/Comment.ts";

const CommentApp: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        // Fetch comments from the backend every 3 seconds
        const fetchComments = async () => {
            try {
                const response = await axios.get<Comment[]>('http://13.125.251.209:8080/api/comments');
                // const response = await axios.get<Comment[]>('http://localhost:8080/api/comments');
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        const intervalId = setInterval(fetchComments, 500);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleAddComment = async (comment: string) => {
        try {
            // Send the new comment to the backend
            const response = await axios.post('http://13.125.251.209:8080/api/comments', { comment });
            // const response = await axios.post('http://localhost:8080/api/comments', { comment: comment });

            const newComment = response.data;

            // Update the local state with the new comment
            setComments([...comments, newComment]);
        } catch (error) {
            console.error('Error adding comment:', error);
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