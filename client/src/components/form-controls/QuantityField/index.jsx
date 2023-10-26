import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import React from "react";
import { Controller } from "react-hook-form";

const QuantityField = ({ form, name }) => {
  const message = form.formState.errors[name]?.message;
  return (
    <FormControl
      sx={{ width: 150 }}
      variant="outlined"
      error={!!message}
      size="small"
    >
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={() =>
                form.setValue(
                  name,
                  +form.getValues()[name] > 0 ? +form.getValues()[name] - 1 : 0
                )
              }
            >
              <RemoveCircleOutlineIcon />
            </IconButton>
            <OutlinedInput {...field} id={name} type="number" />
            <IconButton
              onClick={() => form.setValue(name, +form.getValues()[name] + 1)}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Box>
        )}
      />
      <FormHelperText id={name}>{message ? message : ""}</FormHelperText>
    </FormControl>
  );
};

export default QuantityField;
