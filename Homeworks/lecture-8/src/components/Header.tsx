import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { logout } from '../store/slices/userSlice';
import { Link } from 'react-router-dom';

export default function Header() {
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color='secondary'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {isAuthenticated && <Box sx={{flexGrow: 1, color: '#fff', textDecoration: 'none'}} component={Link} to={'/home'} >Home</Box>}

                    {isAuthenticated
                        ? <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
                        : <Button color="inherit"><Link style={{color: '#fff', textDecoration: 'none'}} to={'/login'}>Login</Link></Button>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}
