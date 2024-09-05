import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";
import {useFormik} from "formik";
import * as yup from "yup";
import {LoginRequest} from "../../ApiServices/UserApiRequest.js";


const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});



const initialValuesLogin = {
    email: "",
    password: "",
};




const Login = ({setIsSignUp}) => {

    const { palette } = useTheme();
    const isNonMobile = useMediaQuery("(min-width:600px)");




    const formik = useFormik({
        initialValues: initialValuesLogin,
        validationSchema: loginSchema,
        onSubmit: async values => {
            //alert(JSON.stringify(values, null, 2));
            //console.log(values);
            await LoginRequest(values.email, values.password);
        },
    });





    return (
        <>

                    <form  action="" onSubmit={formik.handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >

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
                               Login
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
                                Don't have an account? Sign Up here.
                            </Typography>
                        </Box>
                    </form>

        </>
    );
};

export default Login;