import axios from "axios";

export interface User {
    name: string
    password: string
}

const local = 'http://localhost:8080'
const server = 'http://43.202.203.180:8080'

export const RequestCommentApi = axios.get(local + '/api/comment', {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
});

export const requestSignUp = async (user: User) => {
    return await axios.post(local + '/api/user/sign-up', user);
}

export const requestSignIn = async (user: User) => {
    return await axios.post(local + '/api/user/sign-in', user);
}