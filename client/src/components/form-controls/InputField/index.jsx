import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InputField = ({ form, name, label, disable, type = "input" }) => {
  const message = form.formState.errors[name]?.message;
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <TextField
          {...field}
          helperText={message ? message : ""}
          error={!!message}
          placeholder={label}
          fullWidth
          disabled={disable}
          type={type}
        />
      )}
    />
  );
};

export default InputField;
