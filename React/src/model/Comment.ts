import React, {createContext} from "react";

export type User = {
    id: number,
    name: string,
    password: string,
    type: string,
    createdAt: string,
    modifiedAt: string
}

export type Comment = {
    id: number,
    description: string,
    createdAt: string,
    user: User
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