export const getExhibitById = async (id: number) => {
    try {
        const response = await fetch(`/api/exhibit/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch exhibit');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
}

export const addExhibit = async (data: { image: File | null, description: string }) => {
    try {
        const formData = new FormData();
        if (data.image) formData.append("image", data.image);
        formData.append("description", data.description);

        const response = await fetch("/api/exhibit", {
            method: "POST",
            body: formData,
        });

        return await response.json();

    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
};

export const deleteExhibit = async (id: number) => {
    try {
        const response = await fetch(`/api/exhibit/${id}`, {
            method: "DELETE",
        });
        return await response.json();
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
}