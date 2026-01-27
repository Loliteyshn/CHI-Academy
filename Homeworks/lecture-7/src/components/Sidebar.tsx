import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import { navLinks } from "../helper/SidebarNavigation";
import { Link } from 'react-router-dom';

const drawerWidth = 200;

export const Sidebar: React.FC = () => {
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
    )
}