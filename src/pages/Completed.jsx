import { DeleteIcon, EditIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useCompletePost from "../hooks/useCompletedPost";
import DeletePost from "../hooks/useDeletePost";
import userGetPost from "../hooks/useGetPost";
import usePostStore from "../store/Post";

const Completed = () => {
  const { posts } = userGetPost();
  const { deletePostGet } = DeletePost();
  const { handleClick } = useCompletePost();
  const postSetStore = usePostStore((state)=>state.setPosts)
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-EN", options).format(date);
  };


  const getImportantPosts = () => {
    return posts.filter((item) => item?.completed === true);
  };

  const importantPosts = getImportantPosts();

  return (
    <Box w={"full"}>
      <Grid
        templateColumns={{
          sm: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
          xl: "repeat(3,1fr)",
        }}
        gap={4}
        ml={2}
      >
        {importantPosts?.map((item) => (
          <GridItem
            key={item.id}
            cursor={"pointer"}
            borderRadius={4}
            overflow={"hidden"}
            border={"1px solid"}
            w={"350px"}
            h={"350px"}
            borderColor={"whiteAlpha.300"}
            aspectRatio={1 / 1}
            boxShadow={`${
              item.completed === true ? "0 0 10px rgba(0, 255, 0, 1)" : "none"
            }`}
            _hover={{
              boxShadow: "0 0 10px rgba(255, 255, 255, 1)",
              transition: "all ease 0.5s",
            }}
          >
            <Flex
              p={4}
              flexDir={"column"}
              justifyContent={"space-between"}
              h={"full"}
            >
              <Box>
                <Box>
                  <Text>{item?.title}</Text>
                  <Image
                    w={"full"}
                    h={"50px"}
                    alt="image"
                    objectFit={"cover"}
                    src={item?.imageURL}
                  />
                </Box>
                <Text overflowY={"auto"} h={"150px"}>{item?.caption}</Text>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={4}
              >
                <Box
                  alignItems={"center"}
                  display={"flex"}
                  flexDir={"column"}
                  gap={2}
                >
                  <Text>{formatDate(new Date(item?.createdAt))}</Text>
                  <Flex>
                    <Button>{item?.select}</Button>
                    <Button onClick={() => handleClick(item.id)}>
                      {item.completed === true
                        ? " Completed"
                        : "Not completed"}
                    </Button>
                  </Flex>
                </Box>
                <Box
                  alignItems={"center"}
                  display={"flex"}
                  flexDir={"column"}
                  gap={4}
                >
                  <Box gap={4} alignItems={"center"} display={"flex"}>
                    {" "}
                    <EditIcon
                      color={"whiteAlpha.300"}
                      fontSize={20}
                      _hover={{
                        color: "white",
                        transition: "all ease 0.5s",
                      }}
                    />
                    <DeleteIcon
                      onClick={() => deletePostGet(item)}
                      color={"whiteAlpha.300"}
                      _hover={{
                        color: "white",
                        transition: "all ease 0.5s",
                      }}
                      fontSize={20}
                    />
                  </Box>
                  <Box display={"flex"} alignItems={"center"} w={"full"}>
                    <Text
                      w={"full"}
                      textAlign={"center"}
                      color={"gray.400"}
                      fontSize={"12px"}
                    >
                      By {item?.createdAuthor}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Flex>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Completed;
