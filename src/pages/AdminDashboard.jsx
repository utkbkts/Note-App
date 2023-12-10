import React, { useEffect } from "react";
import useGetAlluser from "../hooks/useGetAlluser";
import { Avatar, Box, Text } from "@chakra-ui/react";
import useGetAllAdminPosts from "../hooks/usegetAllpostAdmin";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
const AdminDashboard = () => {
  const { GetUser } = useGetAlluser();
  const { Posts } = useGetAllAdminPosts();

  console.log(GetUser, "posts", Posts);
  return (
    <>
      {" "}
      <Box
        h={"100vh"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={4}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
        >
          <Box
            border={"1px solid white"}
            w={"200px"}
            h={"200px"}
            rounded={"full"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              h={"full"}
            >
              <Text color={"white"} fontSize={"25px"}>
                {GetUser.length}
              </Text>
            </Box>
          </Box>
          <Text>All Users</Text>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDir={"column"}
        >
          <Box
            border={"1px solid white"}
            w={"200px"}
            h={"200px"}
            rounded={"full"}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              h={"full"}
            >
              <Text color={"white"} fontSize={"25px"}>
                {Posts.length}
              </Text>
            </Box>
          </Box>
          <Text>All Posts</Text>
        </Box>
      </Box>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Classification</TableCaption>
          <Thead>
            <Tr>
              <Th>ProfilePicture</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th isNumeric>Posts</Th>
            </Tr>
          </Thead>
          <Tbody>
            {GetUser?.map((item) => (
              <Tr>
                <Td><Avatar src={item.profilePicURL}/></Td>
                <Td>{item.username}</Td>
                <Td>{item.email}</Td>
                <Td isNumeric>{item.posts.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminDashboard;
