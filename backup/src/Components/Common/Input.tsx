import { TextField, InputAdornment, IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { useState } from "react";
type InputProps = {
  label: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void | undefined;
  validator?: string | null | undefined;
  isPassword?: boolean;
  value: string;
};
export default function Input({
  label,
  name,
  onChange,
  onBlur,
  validator,
  value,
  isPassword = false,
}: InputProps) {
  {
    if (isPassword) {
      const [showPassword, setShowPassword] = useState(false);
      return (
        <TextField
          label="Password"
          name="password"
          value={value}
          type={showPassword ? "text" : "password"}
          variant="outlined"
          size="small"
          onChange={onChange}
          error={validator ? true : false}
          helperText={validator && validator}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
    } else {
      return (
        <TextField
          label={label}
          name={name}
          value={value}
          variant="outlined"
          size="small"
          onChange={onChange}
          onBlur={onBlur}
          error={validator ? true : false}
          helperText={validator && validator}
          sx={{width:"100%"}}
        />
      );
    }
  }
}
