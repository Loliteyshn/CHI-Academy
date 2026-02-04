import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik'
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/userSlice";
import { LoginData } from "../types/LoginData";
import type { AppDispatch, RootState } from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const LoginPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home'); 
        }
    }, [isAuthenticated, navigate]);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values: LoginData) => {
            try {
                dispatch(loginUser(values));
            } catch (err) {
                formik.setErrors({ password: 'Data is not correct' });
            }
        },
    });

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f0f2f5'
            }}
        >
            <Box
                component={'form'}
                onSubmit={formik.handleSubmit}
                sx={{
                    width: '100%',
                    maxWidth: '450px',
                    backgroundColor: '#ffffff',
                    p: 4,
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    transition: '0.3s',
                    '&:hover': {
                        boxShadow: '0 6px 26px rgba(0,0,0,0.12)',
                    }
                }}
            >
                <Typography sx={{ textAlign: 'center', fontSize: '1.7rem' }}>Login</Typography>

                <TextField
                    fullWidth
                    id="username"
                    name="username"
                    label="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />

                <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    sx={{
                        py: 1.2,
                        fontSize: '1rem',
                        borderRadius: '8px',
                        textTransform: 'none',
                        transition: '0.25s',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                        }
                    }}
                >
                    Submit
                </Button>

                <Button>
                    Don't have an account? <Link to={'/register'}> Register</Link>
                </Button>

            </Box>
        </Box>

    );
}