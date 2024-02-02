import React from "react";
import {PaginationProps} from "../../model/Comment.ts";
import {PaginationContainer} from "../../styles/comment/Pagination.ts";

const Pagination: React.FC<PaginationProps> = ({itemsPerPage, totalItems, paginate }) => {
    const pageNumbers = [];

    for (let i=1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <PaginationContainer>
            <ul>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
            </ul>
        </PaginationContainer>
    );
}

export default Pagination;