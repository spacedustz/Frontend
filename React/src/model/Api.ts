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
    const token = sessionStorage.getItem('jwt')
    const userName = sessionStorage.getItem('username')

    return await axios.post(
        url + '/api/comment/post',
        { userName,  description },
        { headers : { Authorization: `Bearer ${token}`}}
    );
}

export const getAllComments = async () => {
    return await axios.get(url + '/api/comment')
}

export async function modifyComment(requestData: ModifyComment) {
    const request = `${url}/api/comment/update/${requestData.commentId}`;

    const data = requestData.newDescription
    const headers = {
        'Authorization': 'Bearer ' + requestData.jwt,
        'Content-Type': 'application/json'
    };

    return await axios.patch(request, data, { headers });
}

export async function deleteComment(requestData: DeleteComment) {
    const request = `${url}/api/comment/delete/${requestData.commentId}`;
    const headers = {
        'Authorization': 'Bearer ' + requestData.jwt,
        'Content-Type': 'application/json'
    };

    return await axios.delete(request, { headers });
}