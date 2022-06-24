import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import '../styles/blur_list.css';
import { Typography } from '@mui/material';

const images = {
    "one": "https://wallpaperaccess.com/full/217097.jpg",
    "two": "https://www.teahub.io/photos/full/7-75812_league-of-legends-preseason-2020.png",
    "three": "https://cdn.wallpapersafari.com/96/43/2iV0HB.jpg"
}

export default function BlurList() {

    let defaultImg = "https://wallpaperaccess.com/full/217097.jpg";
    const [text, setText] = React.useState(defaultImg);

    const Item = (props) => {
        return <ListItem
            onMouseOver={() => {
                setText(images[props.image]);
                console.log(text)
            }}
            onMouseLeave={() => setText(defaultImg)}
            disablePadding
        >
            <ListItemText
                primary={props.name}
                primaryTypographyProps={{
                    textAlign: 'center',
                    fontWeight: 'medium',
                    variant: 'h2',
                }}
                className="li two"
            />
        </ListItem>
    }

    return (
        <Box className="back" height="200vh"
            sx={{
                background: `url('${text}')`,
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
            }}
        >
    <Box className="overlay">
        <Box sx={{ width: '100%' }} className="list-heading">
            <Typography variant="h3" sx={{ textAlign: "center", fontWeight: "medium" }}>Work</Typography>
            <Box sx={{ width: '100%' }} className="list-container">
                <Item name="Housing Precarity Model" image="one" />
                <Item name="Community Tutoring" image="two" />
                <Item name="Mav App 2.0" image="three" />
                {/* <Item name="Maverick Debate" image="four" />
                        <Item name="Razors 'N' Blade" image="five" /> */}
            </Box>
        </Box>
    </Box>
        </Box >
    );
}
