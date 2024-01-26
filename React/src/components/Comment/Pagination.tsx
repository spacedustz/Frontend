import React from "react";
import {PaginationProps} from "../../model/Comment.ts";
import styled from "styled-components";

const PaginationContainer = styled.div`
    ul {
        list-style: none;
        padding: 0;
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    li {
        margin-right: 10px;
    }

    button {
        background-color: #3498db;
        color: #fff;
        border: 1px solid #3498db;
        padding: 8px 12px;
        cursor: pointer;

        &:hover {
            background-color: #217dbb;
        }
    }
`;

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