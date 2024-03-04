import { Box, Container, styled } from "@mui/material";
import { lightTheme } from "../../Constants";


export const LoginContainer = styled(Container)`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: ${lightTheme.palette.secondary.main};
`;

export const LoginBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    width: 90%;
    padding: 3rem 0;
    justify-content: center;
    border-radius: 10px;

    @media (min-width: 600px) {
      width: 70%;
    }
  
    @media (min-width: 1000px) {
      width: 35%;
    }
`;