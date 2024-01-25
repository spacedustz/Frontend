import ProgressBar from 'react-bootstrap/ProgressBar';
import React from "react";
import styled from "styled-components";

interface BarProps {
    num: number;
}

const BaseBarStyle = styled(ProgressBar)`
    width: 100%;
`;

const BaseBar: React.FC<BarProps> = ({ num }) => {
    return <BaseBarStyle now={100} label={`${num}%`} variant='success' />;
}

export default BaseBar;