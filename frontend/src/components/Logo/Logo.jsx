import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Styles from './Logo.module.css';

function Logo() {
    return (
        <Box>
            <Typography
                variant="h5"
                noWrap
                component="a"
                sx={{
                    mr: 2,
                    display: { xs: "flex" },
                    flexGrow: 1,
                    margin: { xs: 'auto' },
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "#000",
                    textDecoration: "none",
                }}
            >
                <Link className={Styles.logo} to="/">
                    INK<span>SPIRE</span>
                </Link>
            </Typography>
        </Box>
    );
}

export default Logo;
