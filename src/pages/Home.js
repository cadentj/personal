import React from "react";
import ProjectContainer from '../components/ProjectContainer';
import BlurList from "../components/BlurList";
import TemporaryDrawer from "../components/Drawer";
import Animation from "../components/ShipAnimation";
import { Box, Typography } from "@mui/material";
import HorizontalTiles from "../components/HorizontalTiles";

export default function Home() {
    return (
        <Box sx={{ height: '100vh', width: '100%', position: 'fixed', backgroundColor: "black" }}>
            <HorizontalTiles />
        </Box>
    );
}