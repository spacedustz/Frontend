import axios from "axios";
import {DeleteComment, ModifyComment} from "./Comment.ts";

export interface User {
    name: string
    password: string
}

const url = import.meta.env.VITE_SERVER_URL;

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

export const modifyComment = async (data: ModifyComment) => {
    return await axios.patch(url + '/api/comment/' + data.commentId, {
        body: {
            newDescription: data.newDescription,
        },
        headers: {
            Authorization: `Bearer ${data.jwt}`
        }
    })
}

export const deleteComment = async (data: DeleteComment) => {
    return await axios.delete(url + '/api/comment/'+ data.commentId, {
        headers: {
            Authorization: `Bearer ${data.jwt}`
        }
    })
}