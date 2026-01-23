import { BASE_URL } from "../constants/api"

export const getHeroes = async () => {
    try {
        const response = await fetch(BASE_URL);
        if (!response) throw new Error('Errror fetching users');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error occur: ', err);
        throw err;
    }
}

export const getHeroById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response) throw new Error('Errror fetching users');
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error occur: ', err);
        throw err;
    }
}