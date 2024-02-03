import React, {createContext} from "react";

export type Comment = {
    commentId: number,
    description: string,
    createdAt: string,
    userId: number,
    userName: string,
    userType: string,
    userCreatedAt: string,
}

export type ModifyComment = {
    commentId: number,
    newDescription: string,
    jwt: string
}

export type DeleteComment = {
    commentId: number,
    jwt: string
}

type CommentContextType = {
    comments: Comment[],
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

export interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    paginate: (pageNum: number) => void;
}

export interface CommentFormProps {
    newComment: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CommentListProps {
    comments: Comment[];
    onEditComment: (commentId: number, comment: string) => void;
    onDeleteComment: (commentId: number) => Promise<void>;
}