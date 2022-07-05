import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Link,
  Button,
  Flex,
  Center,
  Spacer,
  Image,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaGavel } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { AppContext } from "./context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  return (
    <Center w="calc(100vw - 17px)" h="50px" boxShadow="lg">
      <Flex w="1100px" h="50px">
        <HStack spacing={8}>
          <Image
            src="../../images/playLogo.png"
            h="30px"
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          />
          {user && (
            <>
              <Button variant="link" leftIcon={<FaGavel />}>
                Peraturan
              </Button>
              <Button variant="link" leftIcon={<AiFillStar />}>
                Upgrade
              </Button>
              <Button variant="link" leftIcon={<BsFillRecordCircleFill />}>
                Extra
              </Button>
            </>
          )}
        </HStack>
        <Spacer />
        <HStack spacing={8}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiSearchAlt2 />}
            />
            <Input type="text" placeholder="Kotak Pencarian" bg="gray.100" />
          </InputGroup>
          {user && (
            <Menu>
              <MenuButton as={Button}>
                {/* left icon ^ */}
                {user.displayName || "user"}
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
          )}
          {!user && <SignupButton />}
          {!user && <LoginButton />}
          {user && <LogoutButton />}
          <Button
            onClick={() => {
              console.log(user);
            }}
          >
            print user
          </Button>
        </HStack>
      </Flex>
    </Center>
  );
};

export const LoginButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AppContext);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        onClose();
      })
      .catch((error) => {
        setUser(null);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("login gagal");
      });
  };
  return (
    <>
      <Button onClick={onOpen} variant="link">
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Text>Login</Text>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="gray.100">
            <VStack spacing={5} my={5}>
              <Input
                colorScheme="tomato"
                bg="white"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                colorScheme="tomato"
                bg="white"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button colorScheme="tomato" w="full" onClick={handleLogin}>
                Login
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack bg="white" w="full">
              <Link color="tomato.500">Tidak ingat password?</Link>
              <Text>
                {" "}
                Tidak punya akun? <Link color="tomato.500">Daftar</Link>
              </Text>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const SignupButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setUser } = useContext(AppContext);

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            setUser(auth.currentUser);
            alert("login sukses");
            onClose();
          })
          .catch(() => {
            setUser(auth.currentUser);
            alert("login sukses, username gagal");
            onClose();
          });
      })
      .catch((error) => {
        setUser(null);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        alert("login gagal");
      });
  };
  return (
    <>
      <Button onClick={onOpen} variant="link">
        Daftar
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>
              <Text>Daftar</Text>
            </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody bg="gray.100">
            <VStack spacing={5} my={5}>
              <Input
                colorScheme="tomato"
                bg="white"
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                colorScheme="tomato"
                bg="white"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                colorScheme="tomato"
                bg="white"
                placeholder="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button colorScheme="tomato" w="full" onClick={handleSignup}>
                Daftar
              </Button>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <VStack bg="white" w="full">
              <Text>
                {" "}
                Sudah memiliki akun? <Link color="tomato.500">Login</Link>
              </Text>
            </VStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export const LogoutButton = () => {
  const { setUser } = useContext(AppContext);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        alert("logout sukses");
      })
      .catch((error) => {
        alert("logout gagal");
      });
  };
  return (
    <Button onClick={handleLogout} variant="link">
      Logout
    </Button>
  );
};
