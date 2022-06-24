import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom";

export default function DrawerButton() {
    const [state, setState] = React.useState({
        top: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = () => (
        <Box
            sx={{ width: 250, height: "100vh" }}
            role="presentation"
            onClick={toggleDrawer('top', false)}
            onKeyDown={toggleDrawer('top', false)}
        >
            <List height="100%">
                <ListItem key="home" disablePadding>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <ListItemButton>

                            <ListItemText
                                primary="Home"
                                primaryTypographyProps={{
                                    textAlign: 'center',
                                    fontWeight: 'medium',
                                    variant: 'h1',
                                }}
                            />

                        </ListItemButton>
                    </Link>
                </ListItem>

                <ListItem key="work" disablePadding>
                    <Link to="/work" style={{ textDecoration: 'none' }}>
                        <ListItemButton>
                            <ListItemText
                                primary="Works"
                                primaryTypographyProps={{
                                    textAlign: 'center',
                                    fontWeight: 'medium',
                                    variant: 'h1',
                                }}
                            />

                        </ListItemButton>
                    </Link>
                </ListItem>
            </List>

        </Box>
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer('top', true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor={'top'}
                open={state['top']}
                onClose={toggleDrawer('top', false)}
            >
                {list('top')}
            </Drawer>
        </div>
    );
}
