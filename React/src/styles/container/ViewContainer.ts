import styled from "styled-components";

export const ViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5% 5% 5% 5%;
    //background-color: rgb(200, 200, 200);
    background-color: rgba(250, 250, 250, 0.6);
    font-size: 15px;
    color: #212529;
    word-break: break-word;
    vertical-align: baseline;
    line-height: 2;
    flex-wrap: wrap;
    width: 100%;
    overflow: auto;

    h2 {
        padding-bottom: 3px;
        font-weight: bold;
    }

    h3 {
        font-weight: bold;
        font-size: 20px;
    }

    @media (max-width: 768px) {
        padding-top: 5%;
        flex-wrap: wrap;
        word-wrap: break-word;
        font-size: 9px;

        h2 {
            padding-bottom: 3px;
            font-weight: bold;
            font-size: 15px;
        }

        h3 {
            padding-bottom: 5px;
            font-weight: bold;
            font-size: 12px;
        }
    }
`;