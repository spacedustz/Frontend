import styled from "styled-components";

export const PaginationContainer = styled.div`
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
        background-color: rgba(52, 152, 219, 0.3);
        color: #fff;
        border: 1px solid #3498db;
        border-radius: 10px;
        padding: 8px 12px;
        cursor: pointer;

        &:hover {
            background-color: #217dbb;
        }
    }
`;