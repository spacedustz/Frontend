import React from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

const CommentApp: React.FC = () => {
    console.log('CommentApp 렌더링');

    return(
        <div>
            <CommentForm />
            <CommentList />
        </div>
    );
};

export default CommentApp;