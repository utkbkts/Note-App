import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Stack,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import usePreviewImage from "../hooks/useImage";
import useAuthStore from "../store/Auth";
import useEditProfile from "../hooks/useEditProfile";

const Profile = () => {
  const fileRef = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } =
    usePreviewImage();
  const authUser = useAuthStore((state) => state.user);
  const [user, setUser] = useState(authUser?.username || "");
  const [bio, setbio] = useState("");
  const {editProfile, isUpdating}=useEditProfile()
  const handleEditProfile=async()=>{
    try {
      await editProfile(user,bio,selectedFile)
      setSelectedFile(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Flex
      w={"full"}
      h={"full"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Stack
        spacing={4}
        w={"600px"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading
          textAlign={"center"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl" }}
        >
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src={selectedFile || authUser?.profilePicURL}>
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                  onClick={() => setSelectedFile("")}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => fileRef.current.click()}>
                Change Icon
              </Button>
            </Center>
            <Input
              onChange={handleImageChange}
              type="file"
              hidden
              ref={fileRef}
            />
          </Stack>
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="user"
            placeholder="Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </FormControl>
        <FormControl id="userName" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            name="user"
            placeholder="Name"
            _placeholder={{ color: "gray.500" }}
            type="text"
            value={authUser?.email}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Biography</FormLabel>
          <Input
            value={bio || authUser?.bio}
            onChange={(e) => setbio(e.target.value)}
            placeholder="Biography"
            _placeholder={{ color: "gray.500" }}
            type="text"
          />
        </FormControl>
        <Stack spacing={6} direction={["column", "row"]}>
          <Button
            bg={"blue.400"}
            color={"white"}
            w="full"
            _hover={{
              bg: "blue.500",
            }}
            isLoading={isUpdating}
            onClick={handleEditProfile}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Profile;
