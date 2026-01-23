import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { navLinks } from '../helper/SidebarNavigation';
import { Link } from 'react-router-dom';

const drawerWidth = 200;

export default function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth, 
                    boxSizing: 'border-box',
                    backgroundColor: 'surfaceAlt',
                    color: 'text.primary'
                },
            }}
        >
            <Toolbar />
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {navLinks.map(({ href, label, Icon }) => (
                        <ListItem key={label} disablePadding>
                            <ListItemButton
                                component={Link}
                                to={href}
                            >
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

            </Box>
        </Drawer>
    );
}