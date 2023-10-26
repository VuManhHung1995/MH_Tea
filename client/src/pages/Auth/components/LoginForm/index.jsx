import { yupResolver } from "@hookform/resolvers/yup";
import FreeBreakfastIcon from "@mui/icons-material/FreeBreakfast";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../../../../components/form-controls/InputField";
import PasswordField from "../../../../components/form-controls/PasswordField";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const schema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

export default function LoginForm({ handleSubmitForm }) {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data) => handleSubmitForm(data);

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: "20%",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              color: "rgb(0, 167, 111)",
              bgcolor: "rgba(0, 167, 111, 0.1)",
            }}
          >
            <FreeBreakfastIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ margin: "8px 0" }}>
            Sign in to MH Tea
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <InputField name="email" label="Email" form={form} />
            <PasswordField
              name="password"
              label="Password"
              form={form}
              mt="20px"
            />
            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "rgba(0, 167, 111, 0.3)",
                color: "black",
                "&:hover": { bgcolor: "rgba(0, 167, 111, 0.2)" },
              }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Button
                  variant="text"
                  size="small"
                  onClick={() => navigate("/register")}
                >
                  Don't have an account? Sign Up
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
