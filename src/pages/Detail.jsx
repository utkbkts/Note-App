import { Box, Flex, Image, ModalOverlay, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import userGetPost from "../hooks/useGetPost";
import { useParams } from "react-router-dom";
import useGetDetail from "../hooks/usegetDetail";

const Detail = () => {
  const { posts } = userGetPost();
  const { detail } = useParams();
  const { getDetail,detailpost } = useGetDetail();
  useEffect(() => {
    getDetail(detail);
  }, [detail, getDetail]);
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-EN", options).format(date);
  };
  return (
    <Box>
      {detailpost.map((item) => (
        <>
          <Flex position={"relative"} display={"flex"} flexDir={"column"}>
            <Image
              w={"full"}
              backgroundPosition={"center"}
              objectFit={"cover"}
              h={"600px"}
              src={item.imageURL}
            />
            <Box
              position={"absolute"}
              w={"full"}
              h={"600px"}

              top={0}
              bg={"rgba(0,0,0,0.5)"}
            ></Box>
            <Flex position={"absolute"} bottom={0} left={"50%"}>
              <Box display={"flex"} alignItems={"center"} flexDir={"column"}>
                <Text fontSize={"35px"}>{item.title}</Text>
                <Text fontSize={"25px"}>
                  {formatDate(new Date(item?.createdAt))}
                </Text>
              </Box>
            </Flex>
          </Flex>
          <Box p={5}>
            <Box>{item?.caption}</Box>
            <Text color={"darkgray"}>By {item.createdAuthor}</Text>
          </Box>
        </>
      ))}
    </Box>
  );
};

export default Detail;
