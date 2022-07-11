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
  VStack,
} from "@chakra-ui/react";
import {
  deleteUser,
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";

import { Avatar } from "../Components";

export default function ProfileSettings() {
  const user = getAuth().currentUser;
  const toast = useToast();
  const [inputUsername, setInputUsername] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputConfirmPassword, setInputConfirmPassword] = useState("");

  const terapkanGantiUsername = () => {
    if (inputUsername === "") {
      toast({
        duration: 2000,
        description: `Input tidak boleh kosong`,
        status: "error",
      });
      return;
    }
    if (inputUsername.length > 12) {
      toast({
        duration: 2000,
        description: `input tidak boleh lebih dari 12 karakter`,
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

  const terapkanGantiEmail = () => {
    if (inputUsername === "") {
      toast({
        duration: 2000,
        description: `Input tidak boleh kosong`,
        status: "error",
      });
      return;
    }
    updateEmail(user, inputEmail)
      .then(() => {
        toast({
          duration: 2000,
          description: "Update email berhasil",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          duration: 2000,
          description: `update email gagal: ${error.message}`,
          status: "error",
        });
      });
  };

  const terapkanGantiPassword = () => {
    if (inputPassword !== inputConfirmPassword) {
      toast({
        duration: 2000,
        description: `Password tidak cocok`,
        status: "error",
      });
      return;
    }
    if (inputPassword === "") {
      toast({
        duration: 2000,
        description: `Input tidak boleh kosong`,
        status: "error",
      });
      return;
    }
    if (inputPassword.length > 20) {
      toast({
        duration: 2000,
        description: `input tidak boleh lebih dari 20 karakter`,
        status: "error",
      });
      return;
    }
    if (inputPassword.length < 6) {
      toast({
        duration: 2000,
        description: `input tidak boleh kurang dari 6 karakter`,
        status: "error",
      });
      return;
    }
    updatePassword(user, inputPassword)
      .then(() => {
        toast({
          duration: 2000,
          description: "Update password berhasil",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          duration: 2000,
          description: `Update password gagal: ${error.message}`,
          status: "error",
        });
      });
  };

  return (
    <Box>
      {Object.keys(user).length !== 0 ? (
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
                <Text
                  as="span"
                  color={user.emailVerified ? "green.200" : "red.200"}
                  fontSize="x-small"
                  ml={2}
                  position="relative"
                  bottom="2px"
                  textTransform="lowercase"
                >
                  {user.emailVerified ? "email verivied" : "email not verivied"}
                </Text>
              </Text>
              <Text mt={1}>
                Bergabung pada: {user.metadata.creationTime.slice(0, 16)}
              </Text>
            </Box>
          </Flex>
          <Box w="700px" mx="auto" mt={7}>
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
              Ganti Email
            </Text>
            <HStack mt={2}>
              <Input
                placeholder={user.email}
                value={inputEmail}
                onChange={(e) => {
                  setInputEmail(e.target.value);
                }}
                type="email"
                autoComplete=""
              />
              <Button
                variant="ghost"
                colorScheme="tomato"
                shadow="md"
                onClick={terapkanGantiEmail}
              >
                Terapkan
              </Button>
            </HStack>
            <Divider my={4} />

            {/* Password */}
            <Text fontWeight="bold" mt={5}>
              Ganti Password
            </Text>
            <VStack mt={2}>
              <Input
                placeholder="masukan password"
                value={inputPassword}
                onChange={(e) => {
                  setInputPassword(e.target.value);
                }}
                type="password"
              />
              <Input
                placeholder="konfirmasi password"
                value={inputConfirmPassword}
                onChange={(e) => {
                  setInputConfirmPassword(e.target.value);
                }}
                type="password"
              />
              <Button
                variant="solid"
                colorScheme="tomato"
                shadow="md"
                w="full"
                onClick={terapkanGantiPassword}
              >
                Terapkan
              </Button>
            </VStack>
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
            <Divider my={4} />
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
        toast({
          duration: 2000,
          description: "Update photo profil berhasil",
          status: "success",
        });
        onClose();
      })
      .catch((error) => {
        toast({
          duration: 2000,
          description: `Update photo profil gagal: ${error.message}`,
          status: "error",
        });
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
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const hapusAvatar = () => {
    updateProfile(auth.currentUser, {
      photoURL: "",
    })
      .then(() => {
        toast({
          duration: 2000,
          description: "Hapus avatar berhasil",
          status: "success",
        });
        onClose();
      })
      .catch((error) => {
        toast({
          duration: 2000,
          description: `Hapus avatar gagal: ${error.message}`,
          status: "error",
        });
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
  const toast = useToast();
  const terapkanHapusAkun = () => {
    deleteUser(auth.currentUser)
      .then(() => {
        toast({
          duration: 2000,
          description: "Hapus akun berhasil",
          status: "success",
        });
      })
      .catch((error) => {
        toast({
          duration: 2000,
          description: `Proses gagal: ${error.message}`,
          status: "error",
        });
      })
      .finally(() => {
        onClose();
      });
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
