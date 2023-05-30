import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {

    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: ""})

    let navigate = useNavigate();

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(user)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/Registration", user)
            .then((Response) => { toast.success(Response.data.message);
                // setTimeout(() => {  navigate('/Signin'); }, 5000);
                 })
            .catch((err) => { toast.error(err.response.data) })
    };

    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChangeHandler}
                                autoComplete="off"
                                name="email"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onChangeHandler}
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link onClick={() => { navigate('/Signin') }} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <ToastContainer/>
        </Container>
    );
}
export default SignupPage