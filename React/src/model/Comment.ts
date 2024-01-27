import React, {createContext} from "react";

export type Comment = {
    commentId: number,
    description: string,
    createdAt: string,
    userId: number,
    userName: string,
    password: string,
    userType: string,
    userCreatedAt: string,
}

type CommentContextType = {
    comments: Comment[],
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>,
};

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

export interface CommentListProps {
    comments: Comment[];
}

export interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    paginate: (pageNum: number) => void;
}