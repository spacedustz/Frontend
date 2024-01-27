import axios from "axios";

export interface User {
    name: string
    password: string
}

// const local = 'http://localhost:8080'
const server = 'http://43.202.203.180:8080'

export const requestSignUp = async (user: User) => {
    return await axios.post(server + '/api/user/sign-up', user);
}

export const requestSignIn = async (user: User) => {
    return await axios.post(server + '/api/user/sign-in', user);
}

export const postComment = async (description: string) => {
    const token = localStorage.getItem('jwt')
    const userName = localStorage.getItem('username')

    return await axios.post(
        server + '/api/comment/post',
        { userName,  description },
        { headers : { Authorization: `Bearer ${token}`}}
    );
}

export const getAllComments = async () => {
    return await axios.get(server + '/api/comment')
}