import { BASE_URL } from "../constants/api"
import { HeroesData, HeroesType } from "../types/heroesType";

export const getHeroes = async (): Promise<HeroesData> => {
    try {
        const response = await fetch(BASE_URL);
        if (!response) throw new Error('Errror fetching users');
        return response.json();
    } catch (err) {
        console.error('Error occur: ', err);
        throw err;
    }
}

export const getHeroById = async (id?: string): Promise<HeroesType> => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        if (!response) throw new Error('Errror fetching users');
        return response.json();
    } catch (err) {
        console.error('Error occur: ', err);
        throw err;
    }
}

