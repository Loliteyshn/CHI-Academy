import { apiRequest } from "../../utils/api";

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    
    const response = await apiRequest(`https://playground.zenberry.one/api/exhibits/post/${id}`, {   
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.error || 'Failed to fetch exhibit' }), { status: response.status });
    }

    const data = await response.json();
    return Response.json(data, { status: response.status });
}

export const DELETE = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const response = await apiRequest(`https://playground.zenberry.one/api/exhibits/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.error || 'Failed to delete exhibit' }), { status: response.status });
    }

    return new Response(JSON.stringify({ message: 'Post deleted successfully' }), { status: 200 });
}