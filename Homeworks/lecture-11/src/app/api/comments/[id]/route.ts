import { cookies } from "next/headers";
import { apiRequest } from "../../utils/api";

export const GET = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const response = await fetch(`https://playground.zenberry.one/api/exhibits/${id}/comments`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.error || 'Failed to fetch comments' }), { status: response.status });
    }

    const data = await response.json();
    return Response.json(data, { status: response.status });
}

export const POST = async (request: Request, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const response = await apiRequest(`https://playground.zenberry.one/api/exhibits/${id}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: await request.text(),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.error || 'Failed to add comment' }), { status: response.status });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
}

export const DELETE = async (request: Request, { params }: { params: Promise<{ exhibitId: string }> }) => {
    const { exhibitId } = await params;
    const { commentId } = await request.json();

    const response = await apiRequest(`https://playground.zenberry.one/api/exhibits/${exhibitId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.error || 'Failed to delete comment' }), { status: response.status });
    }

    return new Response(JSON.stringify({ message: 'Comment deleted successfully' }), { status: 200 });
}