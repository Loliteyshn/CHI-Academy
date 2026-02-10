import { cookies } from "next/headers";

export async function getToken() {
    return (await cookies()).get("token")?.value;
}

export async function apiRequest(url: string, options: RequestInit) {
    const token = await getToken();
    if (!token) {
        throw new Error('Unauthorized');
    }

    return fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        },
    });
}