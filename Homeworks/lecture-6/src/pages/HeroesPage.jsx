import React from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useHeroes } from '../hooks/useHeroes';
import { getHeroes } from '../api/heroesApi';
import { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { HeroesTable } from '../components/HeroesTable';




function HeroesPage() {
    const { heroes, isLoading, error } = useHeroes();
    const navigate = useNavigate();
    const { id } = useParams();

    if (isLoading) return <Typography>Loading...</Typography>
    if (error) return <Typography>Error occur: {error}</Typography>
    console.log(heroes);

    const handleRowClick = (params) => {
        console.log(params);
        navigate(`/heroes/${params.row.id}`)
    }

    return (
        <Box sx={{
            display: 'flex',
            height: '100vh',
            width: '100%',
            gap: 2
        }}>
            <HeroesTable rows={heroes.results} handleRowClick={handleRowClick} />
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

export default HeroesPage