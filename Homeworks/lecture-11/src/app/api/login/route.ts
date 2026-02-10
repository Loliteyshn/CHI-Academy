import { cookies } from "next/headers";

export async function POST(request: Request) {
    const body = await request.json();

    const response = await fetch('https://playground.zenberry.one/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();

    (await cookies()).set("token", data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });

    if (response.ok) {
        return new Response(JSON.stringify(data), { status: 200 });
    } else {
        return new Response(JSON.stringify({ error: data.message || 'Login failed' }), { status: response.status });
    }
}