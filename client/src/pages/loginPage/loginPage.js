import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { LoginBox, LoginContainer } from "./login.styles";
import InputAdornment from '@mui/material/InputAdornment';
import { Alert, IconButton } from '@mui/material';
import { Email, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { lightTheme } from "../../Constants";

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: "",
  });
  const [validCredentials, setValidCredentials] = React.useState(true);

  const handleChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword((show) => !show);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if(userDetails.password){
      console.log({
        email: userDetails.email,
        password: userDetails.password,
      });
      setUserDetails({
        email: "",
        password: "",
      });
      setValidCredentials(true);
    } else{
      setValidCredentials(false);
    }
  };

  return (
    <LoginContainer maxWidth={'100%'}>
      <LoginBox>
        <Avatar alt="logo" src="https://gradious.com/wp-content/uploads/2021/09/Final-Logo-2.svg" variant="square" sx={{ width: 'fit-content'}} />
        <Typography component="h1" variant="h6" mt={'2rem'} mb={'2rem'} fontWeight={600}>
          LOGIN
        </Typography>
        {!validCredentials && (
          <Alert severity="error">Invalid Username or Password</Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" sx={{ marginRight: '15px'}}>
                  <Email />
                </InputAdornment>
              ),
            }}
            id="email"
            placeholder="Email"
            name="email"
            value={userDetails["email"]}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start"  sx={{ marginRight: '15px'}}>
                  <Key />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            id="password"
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={userDetails["password"]}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: "2rem", width: "fit-content", backgroundColor: lightTheme.palette.primary.main }}
          >
            LOGIN
          </Button>
        </Box>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;
