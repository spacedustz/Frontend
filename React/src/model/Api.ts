import axios from "axios";

export interface User {
    id?: number
    name: string
    password: string
    type: string
}

export const RequestCommentApi = axios.get('http://43.202.203.180:8080/api/comment', {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
});

export const requestSignUp = async (user: User) => {
    return await axios.post('http://43.202.203.180:8080/api/user/sign-up', user);
}

export const requestSignIn = async (user: User) => {
    return await axios.post('http://43.202.203.180:8080/api/user/sign-in', user);
}