import { FormHelperText, InputLabel, Select } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Controller } from "react-hook-form";

export default function SelectField({ form, name, label, list }) {
  const message = form.control?._formState?.errors[name]?.message;

  return (
    <FormControl sx={{ width: "100%" }}>
      <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
      <Controller
        control={form.control}
        name={name}
        render={({ field }) => (
          <Select {...field} id={name} label={label} error={!!message}>
            {list.map((category) => (
              <MenuItem value={category.key} key={category.key}>
                {category.value}
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <FormHelperText error={!!message}>{message}</FormHelperText>
    </FormControl>
  );
}
