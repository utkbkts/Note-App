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
import React, { useState } from "react";
import userGetPost from "../hooks/useGetPost";

const Important = () => {
  const [ActiveModal, setActiveModal] = useState(false);
  const { posts } = userGetPost();
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
    return posts.filter((item) => item?.select === "Important");
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
        {importantPosts.length === 0 ? (
          <GridItem
            w={"full"}
            h={"100vh"}
            aspectRatio={1 / 1}
          >
            <Text fontSize={"25px"}>It doesn't matter yet...</Text>
          </GridItem>
        ) : (
          importantPosts.map((item) => (
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
                    <Image   objectFit={"cover"} w={"full"} h={"50px"} src={item?.imageURL} />
                  </Box>
                  <Text overflowY={"auto"} h={"150px"}>{item?.caption}</Text>
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box
                    alignItems={"center"}
                    display={"flex"}
                    flexDir={"column"}
                    gap={2}
                  >
                    <Text>{formatDate(new Date(item?.createdAt))}</Text>
                    <Button>{item?.select}</Button>
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
                        color={"whiteAlpha.300"}
                        _hover={{
                          color: "white",
                          transition: "all ease 0.5s",
                        }}
                        fontSize={20}
                      />
                    </Box>
                    <Box>
                      <Text color={"gray.400"} fontSize={"12px"}>
                        By {item?.createdAuthor}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Flex>
            </GridItem>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default Important;
