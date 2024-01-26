export interface Comment {
    id: number
    comment: string
    createdAt: string
}

export interface CommentListProps {
    comments: Comment[];
}

export interface PaginationProps {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    paginate: (pageNum: number) => void;
}