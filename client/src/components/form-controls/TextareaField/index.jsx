import { FormControl, FormHelperText, TextareaAutosize } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const TextareaField = ({ form, name, label, disable, minRows }) => {
  const message = form.formState.errors[name]?.message;
  return (
    <FormControl fullWidth>
      <Controller
        name={name}
        control={form.control}
        render={({ field }) => (
          <TextareaAutosize
            {...field}
            placeholder={label}
            disabled={disable}
            style={{ padding: "14px" }}
            minRows={minRows}
          />
        )}
      />
      <FormHelperText error={!!message}>{message}</FormHelperText>
    </FormControl>
  );
};

export default TextareaField;
