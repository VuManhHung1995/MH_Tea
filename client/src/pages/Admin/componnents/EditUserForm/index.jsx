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
import { getUserById } from "../../../../api/userApi";
import InputField from "../../../../components/form-controls/InputField";
import SelectField from "../../../../components/form-controls/SelectField";

const defaultTheme = createTheme();

const schema = yup
  .object({
    firstName: yup.string().required("FirstName is required"),
    lastName: yup.string().required("LastName is required"),
    email: yup.string().email().required("Email is required"),
    role: yup.number().required().oneOf([0, 1], "Position is required"),
  })
  .required();
export default function EditUserForm({ handleSubmitForm, editId }) {
  const [userEdit, setUserEdit] = React.useState({});
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      role: 2,
    },
    values: {
      firstName: userEdit.firstName,
      lastName: userEdit.lastName,
      email: userEdit.email,
      role: userEdit.role,
    },
  });
  const onSubmit = (data) => handleSubmitForm(data, userEdit.userCode);
  React.useEffect(() => {
    (async () => {
      try {
        const response = await getUserById(editId);
        setUserEdit(response.data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [editId]);
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
            Edit User
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
            <Box sx={{ mb: "20px" }}>
              <InputField name="email" label="Email" form={form} disable />
            </Box>
            <SelectField
              form={form}
              name="role"
              label="Role"
              list={[
                { key: 0, value: "User" },
                { key: 1, value: "Admin" },
              ]}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
