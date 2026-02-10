'use client';

import { loginUser } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { LoginData } from "@/interfaces/LoginData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";

export const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector((state: RootState) => state.users.isAuthenticated);
    const error = useSelector((state: RootState) => state.users.error);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.push('/home');
        }
    }, [isAuthenticated, router]);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values: LoginData) => {
            dispatch(loginUser(values));
        },
    });

    return (
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

            {error && <Alert severity="error">{error}</Alert>}

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
                color="secondary"
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
                {formik.isSubmitting ? 'Logging in...' : 'Submit'}
            </Button>

            <Button color="secondary">
                Don't have an account? <Link href={'/register'}> Register</Link>
            </Button>

        </Box>
    );
}