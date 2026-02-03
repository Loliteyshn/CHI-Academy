import { CommentsResponseType, ExhibitsResponseType } from "../types/Exhibits";
import { instance } from "./axiosInstance"

export const fetchExhibits = async (page: number = 1) => {
    const response = await instance.get<ExhibitsResponseType>(`/api/exhibits?page=${page}`);
    const response2 = await fetch(`https://playground.zenberry.one/api/exhibits?page=${page}`)
    const data = await response2.json()
    // console.log('result fetch: ', data);
    // console.log('result axios: ', response);

    return data
    // return response
    // return instance.get(`/api/exhibits?page=${page}`);
}


export const fetchMyExhibits = async (page: number = 1) => {
    // const response = await instance.get(`/api/exhibits?page=${page}`);
    // console.log(response.data);
    // return response
    const token = localStorage.getItem('token');
    const response = await fetch(`https://playground.zenberry.one/api/exhibits/my-posts?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    const data = await response.json();
    return data;
}