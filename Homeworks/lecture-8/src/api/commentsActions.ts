import { CommentsResponseType } from "../types/Exhibits";
import { instance } from "./axiosInstance";

export const fetchComments = async (id: number) => {
    const response = await instance.get(`/api/exhibits/${id}/comments`);
    return response.data as CommentsResponseType[];
}

export const addComment = async (exhibitId: number, text: string) => {
    const response = await instance.post(`/api/exhibits/${exhibitId}/comments`, { text });
    return response.data;
}

export const deleteComment = async (exhibitId: number, commentId: number) => {
    const response = await instance.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`);
    return response.data;
}