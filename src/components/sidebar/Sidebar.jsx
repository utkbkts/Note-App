import { DragHandleIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Text, Tooltip } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useAuthStore from "../../store/Auth";
import useLogout from "../../hooks/useLogout";
import useShowToast from "../../hooks/useShowToast";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const AuthUser = useAuthStore((state) => state.user);
  const { login } = useLogin();
  const showToast = useShowToast()
  const { Logout } = useLogout();
  const navigate = useNavigate()
  const handleLogin=async()=>{
    try {
      await login()
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignOut=async()=>{
    try {
      await Logout()
      navigate("/")
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

 
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDirection={"column"}
      h={"full"}
      py={15}
      gap={4}
    >
      <Link to={`/${AuthUser ? AuthUser?.username :""}`}>
        <Box
          display={{ base: "column", md: "flex" }}
          alignItems={"center"}
          justifyContent={"center"}
          gap={4}
          p={2}
        >
          <Avatar src={AuthUser?.profilePicURL} />
          <Flex flexDirection={"column"}>
            <Text
              fontSize={{ base: "12px", md: "14px" }}
              borderBottom={"1px solid white"}
            >
              {AuthUser?.username}
            </Text>
            <Text fontSize={{ base: "12px", md: "14px" }}>{AuthUser?.bio}</Text>
          </Flex>
        </Box>
      </Link>
      <Flex flexDirection={"column"} gap={10}>
        <NavLink to={"/"} className={`${pathname === "/" ? "active" : ""}`}>
          <Tooltip
            hasArrow
            label={"Home"}
            placement="right"
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "flex-start" }}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              p={"2"}
              w={{ base: "full", md: "full" }}
            >
              <DragHandleIcon />
              <Box display={{ base: "none", md: "block" }}>All Tasks</Box>
            </Button>
          </Tooltip>
        </NavLink>
        <NavLink
          to={"/completed"}
          className={`${pathname === "/completed" ? "active" : ""}`}
        >
          <Tooltip
            hasArrow
            label={"completed"}
            placement="right"
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "flex-start" }}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              p={"2"}
              w={{ base: "full", md: "full" }}
            >
              <DragHandleIcon />
              <Box display={{ base: "none", md: "block" }}>completed</Box>
            </Button>
          </Tooltip>
        </NavLink>
        <NavLink
          to={"/calendar"}
          className={`${pathname === "/calendar" ? "active" : ""}`}
        >
          <Tooltip
            hasArrow
            label={"calendar"}
            placement="right"
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "flex-start" }}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              p={"2"}
              w={{ base: "full", md: "full" }}
            >
              <DragHandleIcon />
              <Box display={{ base: "none", md: "block" }}>calendar</Box>
            </Button>
          </Tooltip>
        </NavLink>
        <NavLink
          to={"/important"}
          className={`${pathname === "/important" ? "active" : ""}`}
        >
          <Tooltip
            hasArrow
            label={"Important"}
            placement="right"
            openDelay={500}
            display={{ base: "block", md: "none" }}
          >
            <Button
              display={"flex"}
              alignItems={"center"}
              justifyContent={{ base: "center", md: "flex-start" }}
              gap={4}
              _hover={{ bg: "whiteAlpha.400" }}
              p={"2"}
              w={{ base: "full", md: "full" }}
            >
              <DragHandleIcon />
              <Box display={{ base: "none", md: "block" }}>Important</Box>
            </Button>
          </Tooltip>
        </NavLink>
      </Flex>
      <Tooltip>
        <Flex>
          {AuthUser ? (
            <Button onClick={handleSignOut}>Sign out</Button>
          ) : (
            <Button onClick={handleLogin}>Log in</Button>
          )}
        </Flex>
      </Tooltip>
    </Box>
  );
};

export default Sidebar;
