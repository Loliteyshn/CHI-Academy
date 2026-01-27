import { Box, Typography } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { HeroesTable } from "../components/HeroesTable";
import { GridRowParams } from "@mui/x-data-grid";
import { useRequest } from 'ahooks'
import { getHeroes } from "../api/api";

export const HeroesPage: React.FC = () => {
    const { data: heroes, loading, error } = useRequest(getHeroes);
    const navigate = useNavigate();
    const { id } = useParams();

    if (loading) return <Typography>Loading...</Typography>
    if (error) return <Typography>Error occur: {error.message}</Typography>

    const handleRowClick = (params: GridRowParams) => {
        navigate(`/heroes/${params.row.id}`)
    }

    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            width: '100%',
            gap: 2
        }}>
            <HeroesTable rows={heroes?.results} handleRowClick={handleRowClick} />
            <Box sx={{
                width: '100%',
                overflow: 'hidden',
            }}>
                {id ? (
                    <Outlet />
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Choose anyone
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    )
}