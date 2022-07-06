import React, {
  cloneElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
  Grid,
  GridItem,
  Tag,
  TagLeftIcon,
  TagLabel,
  Img,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Textarea,
  Collapse,
  Icon,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate, NavLink as RouterNavLink } from "react-router-dom";
import { db, auth } from "./firebase";
import { AppContext } from "./context";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { FiRefreshCcw, FiRefreshCw } from "react-icons/fi";
import {
  AiOutlineCheck,
  AiFillAppstore,
  AiTwotoneShop,
  AiFillPieChart,
} from "react-icons/ai";
import {
  FaGavel,
  FaComment,
  FaRegComments,
  FaCommentDots,
  FaComments,
  FaPaintBrush,
  FaGlobeAsia,
  FaHandshake,
} from "react-icons/fa";
import {
  BsFillReplyFill,
  BsFillRecordCircleFill,
  BsGenderAmbiguous,
  BsGenderFemale,
  BsFillShareFill,
  BsFillArchiveFill,
} from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";
import { TbNotebook } from "react-icons/tb";
import { BiSupport, BiWorld, BiTestTube } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { addDoc, collection } from "firebase/firestore";
import { getTags } from "./data/tags";

export const Navbar = (props) => {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  return (
    <Center w="calc(100vw - 17px)" h="50px" boxShadow="lg" {...props}>
      <Flex w="1100px" h="50px">
        <HStack spacing={8}>
          <Img
            src="https://4play.to/assets/logo.png"
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

export const ItemsTag = (props) => {
  return (
    <Center>
      <Tag size="sm" h="10px" variant="subtle" colorScheme={props.colorScheme}>
        <TagLeftIcon boxSize="12px" />
        <TagLabel>{props.text}</TagLabel>
      </Tag>
    </Center>
  );
};

export const NewCollectionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const handleSubmit = async () => {
    try {
      const docRef = await addDoc(collection(db, ""), {
        first: "Ada",
        last: "Lovelace",
        born: 1815,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} colorScheme="tomato" w="full">
        Koleksi Baru
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
        finalFocusRef={btnRef}
        blockScrollOnMount={false}
      >
        <DrawerContent
          w="64vw"
          ml="26vw"
          roundedTop="md"
          border="2px solid #E45476"
          shadow="xl"
        >
          <DrawerCloseButton />
          <DrawerHeader>
            <Grid
              templateColumns="90px auto"
              templateRows="35px auto"
              h="200px"
              w="full"
            >
              <GridItem colSpan={1} rowSpan={2}>
                <Box rounded="full" bg="blue" h="70px" w="70px"></Box>
              </GridItem>
              <GridItem colSpan={1} rowSpan={1} display="flex">
                <PilihTagMenu />
                <Input
                  type="text"
                  w="45vw"
                  variant="unstyled"
                  placeholder="Judul Koleksi"
                  ml="10px"
                />
              </GridItem>
              <GridItem colSpan={1} rowSpan={1}>
                <Textarea
                  type="text"
                  w="full"
                  minH="170px"
                  variant="unstyled"
                  placeholder="Isi Koleksi..."
                  size="sm"
                />
              </GridItem>
            </Grid>
          </DrawerHeader>

          <DrawerBody borderTop="1px solid gray">
            <Button colorScheme="tomato">Posting</Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const PilihTagMenu = () => {
  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          size="xs"
          border="1px dashed gray"
          bg="white"
          color="gray.500"
        >
          Pilih tag
        </MenuButton>
        <MenuList fontSize="sm" overflowY="scroll" h="400px">
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export const HomeSidebar = () => {
  const tags = getTags();
  return (
    <>
      <GridItem colSpan={1}>
        <NewCollectionModal />
        <VStack align="start" color="gray.400">
          <Button
            variant="link"
            colorScheme="tomato"
            mt="20px"
            leftIcon={<FaRegComments />}
          >
            Semua Koleksi
          </Button>
          <Button variant="link" leftIcon={<BsFillReplyFill />}>
            Private Discussion{" "}
          </Button>
          <Button variant="link" leftIcon={<HiOutlineIdentification />}>
            Badges
          </Button>
          <Button variant="link" leftIcon={<AiFillAppstore />}>
            Tag
          </Button>
        </VStack>
        <VStack align="start" color="gray.400" mt="30px">
          {tags.map((tag) => (
            <TagLink tag={tag} />
          ))}
        </VStack>
      </GridItem>
    </>
  );
};

export const TagLink = ({ tag }) => {
  const { isOpen, onToggle } = useDisclosure();
  const getUrlFromTagName = (tagName) => {
    return `/tag/${tagName.toLowerCase().replaceAll(" ", "-")}`;
  };
  return (
    <>
      <HStack>
        {cloneElement(tag.icon, { color: tag.color })}
        <RouterNavLink
          to={getUrlFromTagName(tag.name)}
          onClick={onToggle}
          style={({ isActive }) => {
            return {
              color: isActive ? tag.color : "gray",
            };
          }}
        >
          {tag.name}
        </RouterNavLink>
      </HStack>
      {tag.child.length > 0 && (
        <Collapse in={isOpen}>
          <VStack align="start" ml={3}>
            {tag.child.map((child) => (
              <HStack>
                {child.icon}
                <RouterNavLink to={getUrlFromTagName(child.name)}>
                  {child.name}
                </RouterNavLink>
              </HStack>
            ))}
          </VStack>
        </Collapse>
      )}
    </>
  );
};

export const HomeMain = () => {
  return (
    <>
      <GridItem colSpan={1}>
        <Flex mb="20px">
          <Button color="gray.500">Terakhir</Button>
          <Spacer />
          <IconButton color="gray.500" icon={<FiRefreshCcw />} mx="10px" />
          <IconButton color="gray.500" icon={<AiOutlineCheck />} />
        </Flex>
        <ItemComment />
        <ItemComment />
        <ItemComment />
        <ItemComment />
        <ItemComment />
        <ItemComment />
      </GridItem>
    </>
  );
};

export const ItemComment = () => {
  const navigate = useNavigate();
  const onClickItemComment = () => {
    navigate("/satu");
  };
  return (
    <Flex
      my="5px"
      onClick={onClickItemComment}
      _hover={{ background: "gray.100", cursor: "pointer" }}
      rounded="lg"
      p="10px"
    >
      <Grid templateColumns="50px auto" templateRows="auto auto">
        <GridItem
          colSpan={1}
          rowSpan={2}
          pr="10px"
          display="flex"
          alignItems="center"
        >
          <Box rounded="full" bg="blue" w="40px" h="40px" m="auto"></Box>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1} fontWeight="semibold">
          <Text>Alinity Twitch Streamer - OnlyFans</Text>
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <Flex color="gray">
            <BsFillReplyFill />
            <Text fontSize="sm" ml="2px">
              Oxide666
            </Text>
            <Text fontSize="sm" ml="5px">
              berkomentar 24 menit yang lalu
            </Text>
          </Flex>
        </GridItem>
      </Grid>
      <Spacer />
      <ItemsTag text="Indo" colorScheme="red" />
      <ItemsTag text="General" colorScheme="blue" />
      <HStack w="80px" ml="20px">
        <FaComment />
        <Text>10</Text>
      </HStack>
    </Flex>
  );
};
