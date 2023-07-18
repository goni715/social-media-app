import React from 'react';
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import {Formik, useFormik} from "formik";
import * as yup from "yup";
import {RegisterRequest} from "../../ApiServices/UserApiRequest.js";


const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    //picture: yup.string().required("required"),
});


const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    //picture: "",
};





const Register = ({setIsSignUp}) => {

    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");




    const formik = useFormik({
        initialValues: initialValuesRegister,
        validationSchema: registerSchema,
        onSubmit: async (values, actions) => {
            //alert(JSON.stringify(values, null, 2));
            //console.log(values);

            let result = await RegisterRequest(values.email, values.firstName, values.lastName, values.location, values.occupation,values.password);

            if(result === true){
                setIsSignUp((prev) => !prev);
                actions.resetForm({
                    values: {
                        // the type of `values` inferred to be Blog
                        firstName: "",
                        lastName: "",
                        email: "",
                        password: "",
                        location: "",
                        occupation: "",
                    },
                    // you can also set the other form states here
                });
            }
        },
    });



    return (
        <>
                    <form action="" onSubmit={formik.handleSubmit} >
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                label="First Name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                name="firstName"
                                error={
                                    Boolean(formik.touched.firstName) && Boolean(formik.errors.firstName)
                                }
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                label="Last Name"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                name="lastName"
                                error={Boolean(formik.touched.lastName) && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                label="Location"
                                sx={{ gridColumn: "span 4" }}
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.location}
                                name="location"
                                error={Boolean(formik.touched.location) && Boolean(formik.errors.location)}
                                helperText={formik.touched.location && formik.errors.location}
                            />
                            <TextField
                                label="Occupation"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.occupation}
                                name="occupation"
                                error={
                                    Boolean(formik.touched.occupation) && Boolean(formik.errors.occupation)
                                }
                                helperText={formik.touched.occupation && formik.errors.occupation}
                                sx={{ gridColumn: "span 4" }}
                            />

                            {/*
                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                        setFieldValue("picture", acceptedFiles[0])
                                    }
                                >
                                    {({ getRootProps, getInputProps }) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{ "&:hover": { cursor: "pointer" } }}
                                        >
                                            <input {...getInputProps()} />
                                            {!formik.values.picture ? (
                                                <p>Add Picture Here</p>
                                            ) : (
                                                <FlexBetween>
                                                    <Typography>{formik.values.picture.name}</Typography>
                                                    <EditOutlinedIcon />
                                                </FlexBetween>
                                            )}
                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            */}


                            <TextField
                                label="Email"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                name="email"
                                error={Boolean(formik.touched.email) && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                name="password"
                                error={Boolean(formik.touched.password) && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>


                        {/* BUTTONS */}
                        <Box>
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "2rem 0",
                                    p: "1rem",
                                    backgroundColor: palette.primary.main,
                                    color: palette.background.alt,
                                    "&:hover": { color: palette.primary.main },
                                }}
                            >
                               REGISTER
                            </Button>
                            <Typography
                                onClick={() => {
                                    setIsSignUp((prev) => !prev);
                                    formik.resetForm();
                                }}
                                sx={{
                                    textDecoration: "underline",
                                    color: palette.primary.main,
                                    "&:hover": {
                                        cursor: "pointer",
                                    },
                                }}
                            >
                                     Already have an account? Login here.
                            </Typography>
                        </Box>
                    </form>

        </>
    );
};

export default Register;