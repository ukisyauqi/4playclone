import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  deleteUser,
  getAuth,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Avatar } from "../Components";

export default function ProfileSettings() {
  const user = getAuth().currentUser;
  const toast = useToast();
  const [inputUsername, setInputUsername] = useState();
  const navigate = useNavigate()
  const terapkanGantiUsername = () => {
    if (inputUsername === "") {
      toast({
        duration: 2000,
        description: `Input tidak boleh kosong`,
        status: "error",
      });
      return;
    }
    if (inputUsername.length > 20) {
      toast({
        duration: 2000,
        description: `input tidak boleh lebih dari 20 karakter`,
        status: "error",
      });
      return;
    }
    updateProfile(user, {
      displayName: inputUsername,
    })
      .then(() => {
        toast({
          duration: 2000,
          description: "Ganti username berhasil",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          duration: 2000,
          description: error.message,
          status: "error",
        });
      });
  };

  useEffect(() => {
    if (!user) navigate("/home/semua-koleksi") 
    return () => {
    }
  }, [])
  


  return (
    <Box>
      {user ? (
        <>
          <Flex w="full" bg="#8B9568" h="200px" pl="100px" alignItems="center">
            <Box border="5px solid white" rounded="full" shadow="lg">
              <Avatar
                photoURL={user.photoURL || ""}
                boxSize={100}
                username={user.displayName}
              />
            </Box>
            <Box ml={7} color="white">
              <Text fontSize="2xl" textTransform="capitalize">
                {user.displayName}

              </Text>
              <Text mt={1}>
                Bergabung pada: {user.metadata.creationTime.slice(0, 16)}
              </Text>
            </Box>
          </Flex>
          <Box maxW="700px" mx="auto" mt={7} px="20px">
            <Text fontSize="3xl" fontWeight="semibold">
              Account
            </Text>

            {/* avatar */}
            <Text fontWeight="bold" mt={5}>
              Avatar
            </Text>
            <HStack mt={2}>
              <Avatar
                photoURL={user.photoURL || ""}
                boxSize={50}
                username={user.displayName}
              />
              <ModalGantiAvatar />
              <ModalHapusAvatar />
            </HStack>
            <Divider my={4} />

            {/* username */}
            <Text fontWeight="bold" mt={5}>
              Ganti Username
            </Text>
            <HStack mt={2}>
              <Input
                placeholder={user.displayName}
                value={inputUsername}
                onChange={(e) => {
                  setInputUsername(e.target.value);
                }}
                type="text"
              />
              <Button
                variant="ghost"
                colorScheme="tomato"
                shadow="md"
                onClick={terapkanGantiUsername}
              >
                Terapkan
              </Button>
            </HStack>
            <Divider my={4} />

            {/* email */}
            <Text fontWeight="bold" mt={5}>
              Email
            </Text>
            <HStack mt={2}>
              <Input
                placeholder={user.email}
                disabled
              />
            </HStack>
            <Divider my={4} />

            {/* Delete Akun */}
            <Text fontWeight="bold" mt={5}>
              Hapus Akun
            </Text>
            <HStack mt={2}>
              <Text fontSize="sm" color="gray.500">
                Dengan menghapus akun, anda akan kehilangan semua data anda
              </Text>
              <Spacer />
              <ModalHapusAkun />
            </HStack>
            <Divider mt={4} mb={24}/>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

const ModalGantiAvatar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputPhotoURL, setInputPhotoURL] = useState("");
  const toast = useToast();

  const gantiAvatar = () => {
    if (inputPhotoURL === "") {
      toast({
        duration: 2000,
        description: `input tidak boleh kosong`,
        status: "error",
      });
      return;
    }
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      photoURL: inputPhotoURL,
    })
      .then(() => {
        onClose();
      })
      .catch((error) => {
        onClose();
      });
  };
  return (
    <>
      <Button variant="ghost" colorScheme="tomato" shadow="md" onClick={onOpen}>
        Ganti
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ganti Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Masukan link url gambar"
              value={inputPhotoURL}
              onChange={(e) => setInputPhotoURL(e.target.value)}
            />
            <Image src={inputPhotoURL} mt={2} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="tomato" mr={3} onClick={gantiAvatar}>
              Terapkan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalHapusAvatar = () => {
  const auth = getAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hapusAvatar = () => {
    updateProfile(auth.currentUser, {
      photoURL: "",
    })
      .then(() => {
        onClose();

      })
      .catch((error) => {
        onClose();

      });
  };
  return (
    <>
      <Button variant="ghost" colorScheme="tomato" shadow="md" onClick={onOpen}>
        Hapus Avatar
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ganti Avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah anda yakin ingin menghapus avatar?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="tomato" mr={3} onClick={hapusAvatar}>
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalHapusAkun = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = getAuth();
  const terapkanHapusAkun = () => {
    deleteUser(auth.currentUser)
      .then(() => {
      })
      .catch((error) => {
      }).finally(() => {
        onClose()
      })
  };
  return (
    <>
      <Button size="sm" variant="link" colorScheme="tomato" onClick={onOpen}>
        Hapus Akun
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Akun</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Apakah anda yakin ingin menghapus akun anda?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="tomato" mr={3} onClick={terapkanHapusAkun}>
              Hapus Akun
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
