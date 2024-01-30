import axios from "axios";

export interface User {
    name: string
    password: string
}

const url = import.meta.env.BASE_URL

export const requestSignUp = async (user: User) => {
    return await axios.post(url + '/api/user/sign-up', user);
}

export const requestSignIn = async (user: User) => {
    return await axios.post(url + '/api/user/sign-in', user);
}

export const postComment = async (description: string) => {
    const token = localStorage.getItem('jwt')
    const userName = localStorage.getItem('username')

    return await axios.post(
        url + '/api/comment/post',
        { userName,  description },
        { headers : { Authorization: `Bearer ${token}`}}
    );
}

export const getAllComments = async () => {
    return await axios.get(url + '/api/comment')
}