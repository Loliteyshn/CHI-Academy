import { StipePage } from "@/components/StipePage";
import { ExhibitType } from "@/interfaces/Exhibit";

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const page = (await searchParams).page || "1";

  try {
    const response = await fetch(`https://playground.zenberry.one/api/exhibits?page=${page}`);
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
