import { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Box, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.ts";
import { signOut } from "firebase/auth";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/signin");
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    <Link to="/home" style={{ textDecoration: "none" }}>
                        ポイントアプリ
                    </Link>
                </Typography>

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                    <Button color="inherit" component={Link} to="/home">ホーム</Button>
                    <Button color="inherit" component={Link} to="/ranking">ランキング</Button>
                    <Button color="inherit" component={Link} to="/">ポイント</Button>
                    <Button color="inherit" onClick={handleLogout}>ログアウト</Button>
                </Box>

                <IconButton edge="end" color="inherit" aria-label="menu" sx={{ display: { xs: "block", md: "none" } }} onClick={handleMenuOpen}>
                    <MenuIcon />
                </IconButton>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem component={Link} to="/home" onClick={handleMenuClose}>ホーム</MenuItem>
                    <MenuItem component={Link} to="/ranking" onClick={handleMenuClose}>ランキング</MenuItem>
                    <MenuItem component={Link} to="/" onClick={handleMenuClose}>ポイント</MenuItem>
                    <MenuItem onClick={handleLogout}>ログアウト</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
