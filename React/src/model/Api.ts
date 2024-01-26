import axios from "axios";

export interface User {
    name: string
    password: string
}

export const RequestCommentApi = axios.get('http://localhost:8080/comments', {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
});

export const requestSignUp = async (user: User) => {
    return await axios.post('http://localhost:8080/sign-up', user);
}

export const requestSignIn = async (user: User) => {
    return await axios.post('http://localhost:8080/sign-in', user);
}