import { ExhibitType } from "@/interfaces/Exhibit";
import { FC } from "react";
import { Exhibit } from "./Exhibit";
import PaginationControlled from "./Pagination";

interface StipePageProps {
    data: ExhibitType[];
    page: number;
    lastPage: number;
}

export const StipePage: FC<StipePageProps> = ({ data, page, lastPage }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 3,
            padding: '20px 0',
        }}>
            {data.length === 0
                ? <p>No exhibits found.</p>
                : <>
                    <PaginationControlled page={page} totalPages={lastPage} />
                    {data.map((exhibit) => (
                        <Exhibit key={exhibit.id} exhibit={exhibit} />
                    ))}
                </>
            }

        </div>
    )
}