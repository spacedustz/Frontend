import styled from "styled-components";
import Tabs from "react-bootstrap/Tabs";

export const TabsStyle = styled(Tabs)`
    overflow: hidden;
    background-color: rgba(110, 110, 170, 0.5);
    
    &.mb-3 {
        margin-bottom: 0 !important;
    }
    
    button {
        color: white;

        &:hover {
            transition: color 0.5s;
        }
    }
    
    @media (max-width: 768px) {
        .tab-pane {
            min-height: 100vh;
        }
        
        span {
            font-size: 12px;
        }
    }
`;