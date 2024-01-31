import React, {useState, ChangeEvent, FormEvent} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import styled from "styled-components";
import {requestSignUp, User} from "../../model/Api.ts";
import {AxiosError} from "axios";

const SignUpContainer = styled.div`
    margin: 10;
`;

const SignUp: React.FC = () => {
    const [show, setShow] = useState<boolean>(false);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);
    const [user, setUser] = useState<User>({name: '', password: ''});
    const [signedUserName, setSignedUserName] = useState<string>('');

    const handleClose = (): void => {
        setShow(false);
        setShowSuccess(false);
        setShowError(false);
    };
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
            await requestSignUp(user);
            console.log(user.name + ' 님 회원가입을 축하합니다!');
            setSignedUserName(user.name);

            setUser({name: '', password: ''});
            setShow(false);
            setShowSuccess(true);
        } catch (error) {
            const axiosError = error as AxiosError

            console.error(axiosError);
            if (axiosError && axiosError.response && axiosError.response.status === 400) {
                setUser({name: '', password: ''});
                setShow(false);
                setShowError(true);
            }
        }
    };

    return (
        <SignUpContainer>
            <Button variant="outline-secondary" onClick={handleShow}>
                회원가입
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>이름</Form.Label>
                            <Form.Control type="text" name="name" value={user.name} onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control type="password" name="password" value={user.password}
                                          onChange={handleChange}/>
                        </Form.Group>
                        <br/>
                        <Button variant="primary" type="submit">
                            가입하기
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Modal show={showSuccess} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입 성공</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {signedUserName}님, 회원가입 완료!
                </Modal.Body>
            </Modal>

            <Modal show={showError} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>회원가입 실패</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    이미 존재하는 이름입니다.
                </Modal.Body>
            </Modal>
        </SignUpContainer>
    );
};

export default SignUp;

