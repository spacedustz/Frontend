import React from "react";
import {Button} from "react-bootstrap";

const SignOut: React.FC = () => {
    const handleClick = (): void => {
        localStorage.removeItem('jwt'); // 토큰 삭제
        window.location.reload(); // 페이지 새로고침으로 상태 초기화
        console.log('로그아웃 - LocalStorage JWT Token 제거 완료')
    };

    return (
        <Button variant="outline-secondary" onClick={handleClick}>
            로그아웃
        </Button>
    );
};

export default SignOut;