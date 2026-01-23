import { useEffect } from "react";
import { useState } from "react"
import { getHeroes } from "../api/heroesApi";

export const useHeroes = () => {
    const [heroes, setHeroes] = useState({ info: {}, results: [] });
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getHeroes();
                setHeroes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        })()
    }, [])

    return { heroes, isLoading, error };
}