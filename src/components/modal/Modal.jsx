import {
  ModalBody,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Input,
  Textarea,
  Button,
  Flex,
  CloseButton,
  Image,
  Select,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import usePreviewImage from "../../hooks/useImage";
import CreatePost from "../../hooks/useCreatePost";
const Modalpage = ({ ActiveModal, setActiveModal }) => {
  const [Form, setForm] = useState({
    title: "",
    caption: "",
    selectedFile: "",
    select: "",
  });
  const imageref = useRef(null);
  const { selectedFile, handleImageChange, setSelectedFile } =
    usePreviewImage();
    const { isUpdating, handleCreatePost } = CreatePost();
   
    const handlePostCreation = async () => {
      try {
        await handleCreatePost(Form,selectedFile);
        setActiveModal(!ActiveModal)
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Modal
      isOpen={ActiveModal}
      onClose={ActiveModal}
      motionPreset="slideInLeft"
    >
      <ModalOverlay />
      <ModalContent bg={"black"} border={"1px solid gray"} maxW={"400px"}>
        <ModalHeader>Create Post</ModalHeader>
        <ModalCloseButton onClick={() => setActiveModal(!ActiveModal)} />
        <ModalBody pb={6} gap={2} display={"flex"} flexDirection={"column"}>
          <Input
            placeholder="Title.."
            value={Form.title}
            onChange={(e) => setForm({ ...Form, title: e.target.value })}
          />
          <Textarea
            placeholder={"Post caption"}
            value={Form.caption}
            onChange={(e) => setForm({ ...Form, caption: e.target.value })}
          />
          <Input
            onChange={handleImageChange}
            hidden
            ref={imageref}
            type="file"
          />
          <Select
            value={Form.select}
            onChange={(e) => setForm({ ...Form, select: e.target.value })}
            placeholder="Select option"
          >
            <option value="Important">Important</option>
            <option value="Normal">Normal</option>
          </Select>
          <BsFillImageFill onClick={() => imageref.current.click()} size={16} />
          {selectedFile && (
            <Flex
              mt={5}
              w={"full"}
              position={"relative"}
              justifyContent={"center"}
            >
              <Image src={selectedFile} alt="selected img" />
              <CloseButton
                position={"absolute"}
                top={2}
                right={2}
                color={"black"}
                onClick={() => setSelectedFile("")}
              />
            </Flex>
          )}
          <Button onClick={handlePostCreation} isLoading={isUpdating}>Create</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default Modalpage;
