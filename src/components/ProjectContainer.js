import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Container, Typography } from '@mui/material';
import Slide from './Slide';

import '../styles/slides.css';


export default function ProjectContainer() {

    let initialTxt = "Featured Work";
    const [text, setText] = React.useState(initialTxt);
    
    const ProjectSlide = ({project, stagger}) => {
        console.log(stagger)
        return <Box 
            // sx={{mt:stagger}}
            className={"slide " + stagger}
            onMouseOver={() => setText(project)}
            onMouseLeave={() => setText(initialTxt)} 
            >
            <Slide/>
        </Box>
    }

    return (
        <Stack
            alignItems="center"
            style={{ minHeight: '90vh' }}
            spacing={3}
            className="container"
        >
            <Stack
                direction="row"
                spacing="20px"
            >
                <ProjectSlide project="Housing Precarity Model" stagger="one"/>
                <ProjectSlide project="Community Tutoring" stagger="two" />
                <ProjectSlide project="Mav App 2.0" stagger="three" />
                <ProjectSlide project="Receipt Bot" stagger="two"/>
                <ProjectSlide project="Maverick Debate" stagger="one" />
                <ProjectSlide project="Razors 'N' Blade" stagger="three"/>
                <ProjectSlide project="Maverick Debate" stagger="one" />
                <ProjectSlide project="Razors 'N' Blade" stagger="three"/>
            </Stack>



            <Container sx={{ textAlign: "center", border: 0 }}>
                <Typography variant="h4">
                    {text}
                </Typography>
                <Typography variant="subtitle2">Explore some of my projects</Typography>
            </Container>
        </Stack>
    );
}