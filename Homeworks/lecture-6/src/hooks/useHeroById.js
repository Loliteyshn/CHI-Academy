import { useEffect, useState } from "react";
import { getHeroById } from "../api/heroesApi";

export const useHeroById = (id) => {
    const [hero, setHero] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        (async () => {
            try {
                setLoading(true);

                const data = await getHeroById(id);
                console.log(data);
                setHero(data);
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false);
            }
        })()
    }, [id])


    return { hero, isLoading, error }
}