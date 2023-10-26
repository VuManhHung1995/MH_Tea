import { yupResolver } from "@hookform/resolvers/yup";
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
import SelectField from "../../../../components/form-controls/SelectField";

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const schema = yup
  .object({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
    rePassword: yup
      .string()
      .required("Password is required")
      .oneOf([yup.ref("password"), null], "Passwords must match"),
    role: yup.number().required().oneOf([0, 1], "Role is required"),
  })
  .required();

export default function RegisterForm({ handleSubmitForm }) {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
      role: 2,
    },
  });
  const onSubmit = (data) => handleSubmitForm(data);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add User
          </Typography>
          <Box
            component="form"
            sx={{ mt: 1 }}
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <InputField name="firstName" label="FirstName" form={form} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputField name="lastName" label="LastName" form={form} />
              </Grid>
            </Grid>
            <InputField name="email" label="Email" form={form} />
            <Box sx={{ mt: 2 }}>
              <PasswordField name="password" label="Password" form={form} />
            </Box>
            <Box sx={{ mt: 2 }}>
              <PasswordField
                name="rePassword"
                label="re-Password"
                form={form}
              />
            </Box>
            <Box sx={{ mt: 2 }}>
              <SelectField
                form={form}
                name="role"
                label="Role"
                list={[
                  { key: 0, value: "User" },
                  { key: 1, value: "Admin" },
                ]}
              />
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
