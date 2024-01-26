import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import {requestSignIn} from "../../model/Api.ts";

interface User {
    name: string;
    password: string;
}

const SignIn: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [user, setUser] = useState<User>({ name: '', password: '' });

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
                localStorage.setItem('jwt', response.data.token);
                handleClose();
            } else {
                alert('유저 이름이나 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                로그인
            </Button>

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
