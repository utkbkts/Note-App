import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Admindashboard from "../hooks/useAdmin";

const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { adminpage } = Admindashboard();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin=async(e)=>{
    e.preventDefault()
    await adminpage(email,password)
  }
  const isEmailError = email === "";
  const isPasswordError = password === "";
  return (
    <Box
      w={"100%"}
      minHeight={"100vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box
        minHeight={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        w={"400px"}
      >
        <FormControl isInvalid={isEmailError || isPasswordError}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={handleEmailChange} />
          {!isEmailError ? (
            <FormHelperText>
              Enter the email you'd like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>Email is required.</FormErrorMessage>
          )}
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
          {!isPasswordError ? (
            <FormHelperText>
              Enter the password you'd like to receive the newsletter on.
            </FormHelperText>
          ) : (
            <FormErrorMessage>password is required.</FormErrorMessage>
          )}
          <Button onClick={handleLogin} marginTop={"15px"} colorScheme="teal" size="md">
            Sign Up
          </Button>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Admin;
