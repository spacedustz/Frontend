import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {requestSignIn, User} from "../../model/Api.ts";
import SignUp from "./SignUp.tsx";
import SignOut from "./SignOut.tsx";
import {SignUpSignInMargin, StyledUserName, UserAndLogoutContainer} from "../../styles/auth/SignIn.ts";
import {useAuth} from "./AutnContext.tsx";

const SignIn: React.FC = () => {
    const { loggedIn, loggedInUserName, setLoggedIn, setLoggedInUserName } = useAuth();
    const [show, setShow] = useState<boolean>(false);
    const [user, setUser] = useState<User>({ name: '', password: '' });

    useEffect(() => {
        const token = sessionStorage.getItem('jwt')
        const userName = sessionStorage.getItem('username')

        if(token) {
            setLoggedIn(true);
        }

        if (userName) {
            setLoggedInUserName(userName)
        }
    }, []);

    const handleClose = (): void => setShow(false);
    const handleShow = (): void => setShow(true);

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await requestSignIn(user);
            if (response.status === 200) {
                sessionStorage.setItem('jwt', response.data.token);
                sessionStorage.setItem('username', response.data.name)
                setLoggedIn(true);
                setLoggedInUserName(user.name);
                handleClose();

                console.log(user.name + ' 님 로그인에 성공 하셨습니다.')
            } else {
                alert('유저 이름이나 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('로그인 실패 : ' + error);
        }
    };

    return (
        <>
            {!loggedIn && (
                <SignUpSignInMargin>
                    <SignUp />
                    <Button variant="outline-secondary" onClick={handleShow}>
                        로그인
                    </Button>
                </SignUpSignInMargin>
            )}

            {loggedIn && (
                <UserAndLogoutContainer>
                    <StyledUserName>{loggedInUserName + ' 님'}</StyledUserName>
                    <SignOut />
                </UserAndLogoutContainer>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>이름</Form.Label>
                            <Form.Control type="text" name="name" value={user.name} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" name="password" value={user.password} onChange={handleChange} />
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit">
                            로그인
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SignIn;
