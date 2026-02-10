import { cookies } from "next/headers";

export async function GET(request: Request) {
    (await cookies()).delete("token");

    return new Response(JSON.stringify({ message: 'Logged out successfully' }), { status: 200 });
}