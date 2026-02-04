import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from 'formik'
import * as yup from 'yup';
import { register } from "../api/userActions";
import { Link, useNavigate } from "react-router-dom";

const validationSchema = yup.object({
    username: yup
        .string()
        .min(3, 'Username should be of minimun 3 characters length')
        .required('Username is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

export const RegisterPage = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await register(values);
                navigate('/login')
            } catch (err) {
                console.error(`Error : ${err}`);
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
                <Typography sx={{ textAlign: 'center', fontSize: '1.7rem' }}>Register</Typography>

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
                 <Link to={'/login'}> Login</Link>
                </Button>
            </Box>
        </Box>

    );
}