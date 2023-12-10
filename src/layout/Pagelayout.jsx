import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const PageLayout = ({ children }) => {
  const {pathname} = useLocation();
  return (
    <Flex py={10}>
      {pathname !== "/admin" && pathname !=="/adminlogin" && pathname !=="/admindashboard" ? (
        <Box borderRadius={"10px"} w={{ base: "w-full", md: "240px" }} border={"1px solid darkgray"} h={"100vh"}>
          <Sidebar />
        </Box>
      ) : null}
      <Box flex={2} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};

export default PageLayout;