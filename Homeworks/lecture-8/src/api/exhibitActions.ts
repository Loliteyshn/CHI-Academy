import { ExhibitsResponseType } from "../types/Exhibits";
import { instance } from "./axiosInstance"

export const fetchExhibits = async (page: number = 1) => {
    const response = await instance.get(`/api/exhibits?page=${page}`);
    return response as unknown as ExhibitsResponseType;
}

export const fetchMyExhibits = async (page: number = 1) => {
    const response = await instance.get(`/api/exhibits/my-posts?page=${page}`);
    return response as unknown as ExhibitsResponseType;
}

export const addExhibit = async (data: { description: string, image: File | null }) => {
    const response = await instance.post(`/api/exhibits`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const deleteExhibit = async (exhibitId: number) => {
    const response = await instance.delete(`/api/exhibits/${exhibitId}`);    
    return response.data;
}