import React from "react";
import ProjectContainer from '../components/ProjectContainer';
import BlurList from "../components/BlurList";
import TemporaryDrawer from "../components/Drawer";
import Animation from "../components/ShipAnimation";
import { Box, Typography } from "@mui/material";


export default function Intro() {

    return (
        <Box>
            <Animation sx={{height:'100vh', width:'100%', position:'fixed'}}/>

        </Box>        
    );
}