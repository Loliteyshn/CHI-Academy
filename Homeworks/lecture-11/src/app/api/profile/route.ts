import { apiRequest } from "../utils/api";

export async function GET() {
    const response = await apiRequest('https://playground.zenberry.one/users/my-profile', {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.error || 'Failed to fetch profile' }), { status: response.status });
    }

    const data = await response.json();
    return Response.json(data, { status: response.status });
}