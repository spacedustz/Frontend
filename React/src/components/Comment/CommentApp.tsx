import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentApp: React.FC = () => {
    return(
        <div>
            <CommentForm />
            <CommentList />
        </div>
    );
};

export default CommentApp;