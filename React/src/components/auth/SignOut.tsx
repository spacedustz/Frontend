import React from "react";
import {Button} from "react-bootstrap";
import {useAuth} from "./AutnContext.tsx";

const SignOut: React.FC = () => {
    const { setLoggedIn, setLoggedInUserName } = useAuth();

    const handleClick = (): void => {
        sessionStorage.removeItem('jwt');
        sessionStorage.removeItem('username')
        setLoggedIn(false)
        setLoggedInUserName('')
        window.location.reload(); // 페이지 새로고침으로 상태 초기화
        console.log('로그아웃 - Session Storage JWT Token 제거 완료')
    };

    return (
        <Button variant="outline-secondary" onClick={handleClick}>
            로그아웃
        </Button>
    );
};

export default SignOut;