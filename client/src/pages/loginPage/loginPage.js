import * as React from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { LoginBox, LoginContainer } from "./login.styles";
import { Email, Key, Visibility, VisibilityOff } from "@mui/icons-material";
import { lightTheme } from "../../Constants";
import { api } from "../../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../../slice/userReducer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    email: "",
    password: "",
  });
  const [validCredentials, setValidCredentials] = React.useState(true);
  const [loginError, setLoginError] = React.useState("");
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const passwordRegex = /^[a-zA-Z]{4}\d{4}$/;

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
    if (!emailRegex.test(userDetails.email)) {
      setValidCredentials(false);
      setLoginError("Invalid Email");
    } else if (!passwordRegex.test(userDetails.password)) {
      console.log(passwordRegex);
      console.log(passwordRegex.test(userDetails.password));
      console.log(userDetails.password);
      setValidCredentials(false);
      setLoginError("Invalid Password");
    } else {
      api
        .post("/login", {
          email: userDetails.email,
          password: userDetails.password,
        })
        .then((res) => {
          dispatch(
            loginAction({
              id: res.data.data.id,
              name: res.data.data.name,
              role: res.data.data.role,
              token: res.data.data.token,
              tokenExpiresAt: res.data.data.tokenExpiresAt,
            })
          );
          setUserDetails({
            email: "",
            password: "",
          });
          setValidCredentials(true);
          navigate("/batches");
        })
        .catch((err) => {
          setValidCredentials(false);
          setLoginError(err.response.data.message);
        });
    }
  };

  return (
    <LoginContainer maxWidth={"100%"}>
      <LoginBox>
        <Avatar
          alt="logo"
          src="https://gradious.com/wp-content/uploads/2021/09/Final-Logo-2.svg"
          variant="square"
          sx={{ width: "fit-content" }}
        />
        <Typography
          component="h1"
          variant="h6"
          mt={"2rem"}
          mb={"2rem"}
          fontWeight={600}
        >
          LOGIN
        </Typography>
        {!validCredentials && <Alert severity="error">{loginError}</Alert>}
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
                <InputAdornment position="start" sx={{ marginRight: "15px" }}>
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
                <InputAdornment position="start" sx={{ marginRight: "15px" }}>
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
              ),
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
            sx={{
              mt: "2rem",
              width: "fit-content",
              backgroundColor: lightTheme.palette.primary.main,
            }}
          >
            LOGIN
          </Button>
        </Box>
      </LoginBox>
    </LoginContainer>
  );
};

export default LoginPage;
