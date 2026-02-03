import { CommentsResponseType } from "../types/Exhibits";
import { instance } from "./axiosInstance";

export const fetchComments = async (id: number): Promise<CommentsResponseType[]> => {
    // const response = await instance.get(`/api/exhibits/${id}/comments`);
    const response = await fetch(`https://playground.zenberry.one/api/exhibits/${id}/comments`)
    const data = await response.json();
    return data
}