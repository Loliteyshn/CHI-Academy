export const register = async (credentials: { username: string, password: string }) => {
    try {
        const response = await fetch('https://playground.zenberry.one/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }); 
        const data = await response.json();
        return data;
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error occur: ${err.message}`);
        }
    }
}

export const login = async (credentials: { username: string, password: string }) => {
    try {
        const res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(`Error occur:`, err);
    }
}

export const getUserProfile = async () => {
    try {
        const response = await fetch(`/api/profile`);
        if (response.status === 401) {
            throw new Error('Unauthorized');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Error occur:`, err);
    }
}

export const logout = async () => {
    try {
        const response = await fetch("/api/logout", {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(`Error occur:`, err);
    }
}