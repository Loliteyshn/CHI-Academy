import { Box, Button, TextField, Typography } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { addExhibit } from "../api/exhibitActions";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
    image: Yup.mixed()
        .required("Image is required")
        .test("fileType", "Only image formats are allowed", (value) => {
            if (!value) return false;
            return (
                value instanceof File &&
                ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(
                    value.type
                )
            );
        })
        .test("fileSize", "Image must be less than 5MB", (value) => {
            if (!value) return false;
            return value instanceof File && value.size <= 5 * 1024 * 1024;
        }),

    description: Yup.string()
        .required("Description is required")
        .min(3, "Description must be at least 3 characters"),
});


export const NewPost = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            image: null,
            description: "",
        },
        validationSchema,
        onSubmit: async (values: { image: File | null, description: string }, { resetForm }) => {
            try {
                await addExhibit(values);
                navigate('/home');
            } catch (error) {
                console.error("Error adding exhibit:", error);
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
                <Typography sx={{ textAlign: 'center', fontSize: '1.7rem' }}>Add new post</Typography>

                <TextField
                    fullWidth
                    id="image"
                    name="image"
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    onBlur={formik.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        formik.setFieldValue("image", e.currentTarget.files?.[0] || null)
                    }
                    error={formik.touched.image && Boolean(formik.errors.image)}
                    helperText={formik.touched.image && formik.errors.image}
                />

                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
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
                    {formik.isSubmitting ? 'Sending...' : 'Add'}
                </Button>
            </Box>
        </Box>

    );
}