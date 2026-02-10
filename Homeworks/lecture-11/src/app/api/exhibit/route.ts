import { apiRequest } from "../utils/api";

export async function POST(request: Request) {
    const formData = await request.formData();
    const backendFormData = new FormData();
    const image = formData.get("image") as File | null;
    const description = formData.get("description") as string;

    if (image) backendFormData.append("image", image);
    backendFormData.append("description", description);

    const response = await apiRequest('https://playground.zenberry.one/api/exhibits', {
        method: 'POST',
        body: backendFormData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        return new Response(JSON.stringify({ error: errorData.error || 'Failed to add exhibit' }), { status: response.status });
    }

    const data = await response.json();
    return Response.json(data, { status: response.status });
}
