import React, { useState} from 'react'
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { toast } from 'react-toastify'
import InputBase from '@mui/material/InputBase';
import MuiAppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
import axios from 'axios';
import { Box, ClickAwayListener } from '@mui/material';
import NavList from '../navList/NavList';
import './Header.css'

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1
}));
const openedMixin = (theme) => ({
    width: '280px',
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const Header = (props) => {
    const [open, setOpen] = useState(true);
    const [search, setSearch] = useState("")

    let navigate = useNavigate();

    props.searchMethod(search);

    const handleDrawerOpen = () => {
        if (open === false) {
            setOpen(true)
        }
        else {
            setOpen(false)
        }
    }

    const logoutHandler = (event) => {
        event.preventDefault();
        axios
            .post(`http://localhost:8080/logout/${localStorage.getItem("Token")}`)
            .then((res) => {
                console.log(res.data);
                localStorage.clear();
                toast.success(res.data.message);
                props.loadComponent();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <>
            <ClickAwayListener onClickAway={() => { setOpen(false) }}>
                <AppBar sx={{ bgcolor: "white" }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: '1%'
                            }}
                        >
                            <MenuIcon color="action" />
                        </IconButton>
                        <img src='https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png' height={'40px'} alt='icon' />
                        <Typography variant="h5" noWrap component="div" sx={{ color: "rgb(94, 94, 94)" }}>
                            Keep
                        </Typography>
                        <Box className='container' sx={{ marginLeft: '7%', display: 'flex', height: '45px', flexFlow: 'row', alignItems: 'flex-end', maxWidth: '100%', width: '52%', borderRadius: 2 }}>
                            <IconButton>
                                <SearchIcon sx={{ color: 'action.active' }} />
                            </IconButton>
                            <InputBase onChange={(e) => setSearch(e.target.value)} sx={{ ml: 1, flex: 1 }} placeholder="Search..." />
                        </Box>
                        {localStorage.getItem("Token") &&
                            <Button onClick={logoutHandler} variant="outlined" sx={{ color: 'Black', borderColor: 'rgb(231, 231, 34)', marginLeft: 'auto' }}>Log Out</Button>}
                        {!localStorage.getItem("Token") &&
                            <Button onClick={() => { navigate('/Signin'); }} variant="outlined" sx={{ color: 'Black', borderColor: 'rgb(231, 231, 34)', marginLeft: 'auto' }}>Login</Button>}
                    </Toolbar>
                </AppBar>
            </ClickAwayListener>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader />
                <NavList />
            </Drawer>
        </>

    )
}

export default Header