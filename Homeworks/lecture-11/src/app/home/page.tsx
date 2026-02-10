import { StipePage } from "@/components/StipePage";
import { ExhibitType } from "@/interfaces/Exhibit";
import { cookies } from "next/headers";

export default async function MyExhibits({ searchParams }: { searchParams: { page: string } }) {
    const page = (await searchParams).page || "1";
    const token = (await cookies()).get("token")?.value;

    if (!token) {
        return <div>Please log in to view your exhibits.</div>;
    }

    try {
        const response = await fetch(`https://playground.zenberry.one/api/exhibits/my-posts?page=${page}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            cache: "no-store",
        });
        const rawData = await response.json();
        const data = rawData.data.map((item: ExhibitType) => ({
            ...item,
            createdAt: new Date(item.createdAt).toLocaleDateString('uk-UA')
        }));
        return <StipePage data={data} page={parseInt(page)} lastPage={rawData.lastPage} />;
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}