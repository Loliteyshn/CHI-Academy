import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function Header() {
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    {isAuthenticated
                        &&
                        <Box sx={{ flexGrow: 1 }} >
                            <Link style={{ color: '#fff', textDecoration: 'none', padding: '10px' }} to={'/'}>Home</Link>
                            <Link style={{ color: '#fff', textDecoration: 'none', padding: '10px' }} to={'/home'}>My exhibits</Link>
                            <IconButton component={Link}
                                to="/new-post"
                                sx={{ color: '#fff' }}>
                                <AddIcon />
                            </IconButton>
                        </Box>
                    }

                    {isAuthenticated
                        ? <Button color="inherit" onClick={() => {
                            dispatch(logout())
                            navigate("/login", { replace: true });
                        }}>Logout</Button>
                        : <Button color="inherit"><Link style={{ color: '#fff', textDecoration: 'none' }} to={'/login'}>Login</Link></Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
