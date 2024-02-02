import styled from "styled-components";

export const StyledUserName = styled.span`
    color: white;
    margin-right: 18px;
`;

export const SignUpSignInMargin = styled.div`
    display: flex;
    justify-content: space-around;

    & > *:first-child {
        margin-right: 15px;
    }
`;

export const UserAndLogoutContainer = styled.div`
    display: flex;
    flex-direction: row;
    
    span {
        padding-top: 10px;
    }

    @media (max-width: 768px) {
        flex-direction: row;
        
        span {
            padding-top: 10px;
            font-size: 14px;
        }
        
        button {
            font-size: 14px;
        }
    }
`;