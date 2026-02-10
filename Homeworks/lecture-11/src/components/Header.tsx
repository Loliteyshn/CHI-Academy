"use client";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logoutUser, fetchUser } from '@/store/slices/userSlice';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Header() {
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const route = useRouter();

    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    {isAuthenticated
                        &&
                        <Box sx={{ flexGrow: 1 }} >
                            <Link style={{ color: '#fff', textDecoration: 'none', padding: '10px' }} href={'/'}>Home</Link>
                            <Link style={{ color: '#fff', textDecoration: 'none', padding: '10px' }} href={'/home'}>My exhibits</Link>
                            <IconButton component={Link}
                                href="/new-post"
                                sx={{ color: '#fff' }}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    }

                    {isAuthenticated
                        ? <Button color="inherit" onClick={() => {
                            dispatch(logoutUser())
                            route.replace('/login');
                        }}>Logout</Button>
                        : <Box>
                            <Button color="inherit"><Link style={{ color: '#fff', textDecoration: 'none' }} href={'/'}>Home</Link></Button>
                            <Button color="inherit"><Link style={{ color: '#fff', textDecoration: 'none' }} href={'/login'}>Login</Link></Button>
                        </Box>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
