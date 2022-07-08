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
  Divider,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import {
  useNavigate,
  NavLink as RouterNavLink,
  useParams,
} from "react-router-dom";
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
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
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
              navigate("/home/semua-koleksi");
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

export const NewCollectionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handlePosting = async () => {
    try {
      if (user) {
        const docRef = await addDoc(collection(db, "article"), {
          username: user.displayName || "",
          uid: user.uid,
          photoUrl: user.photoUrl || "",
          title: title,
          description: description,
          tag1: selectedTags[0] || "",
          tag2: selectedTags[1] || "",
          timeStamp: serverTimestamp(),
        });
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription("");
      setSelectedTags([]);
    } else {
    }

    return () => {};
  }, [isOpen]);

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
                <PilihTagMenu setSelectedTags={setSelectedTags} />
                <Input
                  type="text"
                  variant="unstyled"
                  placeholder="Judul Koleksi"
                  ml="10px"
                  value={title}
                  w="30vw"
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </GridItem>
            </Grid>
          </DrawerHeader>

          <DrawerBody borderTop="1px solid gray">
            <Button colorScheme="tomato" onClick={handlePosting}>
              Posting
            </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const PilihTagMenu = ({ setSelectedTags }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const tags = getTags().slice(3, 14);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [showChildTag, setShowChildTag] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowChildTag(false);
      setSelectedChild(null);
      setSelectedTag(null);
    }
  }, [isOpen]);

  return (
    <>
      {selectedTag === null ? (
        <Button
          onClick={onOpen}
          size="xs"
          border="1px dashed gray"
          bg="white"
          color="gray.500"
        >
          Pilih Tag
        </Button>
      ) : (
        <Button onClick={onOpen} variant="unstyled">
          <Flex>
            {selectedTag != null && (
              <ItemCommentTag
                text={tags[selectedTag].name}
                bg={tags[selectedTag].color}
                icon={tags[selectedTag].icon}
              />
            )}
            {selectedChild != null && (
              <ItemCommentTag
                text={tags[selectedTag].child[selectedChild].name}
                bg={tags[selectedTag].color}
                icon={tags[selectedTag].child[selectedChild].icon}
              />
            )}
          </Flex>
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
        <ModalOverlay />
        <ModalContent overflow="hidden" position="absolute">
          <ModalHeader bg="#E7EDF3" fontSize="md" m={0}>
            <Text>Pilih Tag Untuk Diskusi Anda</Text>
            <Flex h={4} mt={3}>
              {selectedTag != null && (
                <ItemCommentTag
                  text={tags[selectedTag].name}
                  bg={tags[selectedTag].color}
                  icon={tags[selectedTag].icon}
                />
              )}
              {selectedChild != null && (
                <ItemCommentTag
                  text={tags[selectedTag].child[selectedChild].name}
                  bg={tags[selectedTag].color}
                  icon={tags[selectedTag].child[selectedChild].icon}
                />
              )}
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p={0} m={0}>
            {!showChildTag
              ? tags.map((tag, i) => (
                  <Flex
                    key={i}
                    color={tag.color}
                    my={1}
                    _hover={{ bg: "gray.100" }}
                    py={2}
                    px={6}
                    cursor="pointer"
                    bg={selectedTag === i ? "gray.100" : "whte"}
                    onClick={() => {
                      setSelectedTag(i);
                      if (tag.child.length > 0) setShowChildTag(true);
                    }}
                  >
                    <Box mt={1} mr={2}>
                      {tag.icon}
                    </Box>
                    <Text textTransform="capitalize">
                      {tag.name.replaceAll("-", " ")}
                    </Text>
                  </Flex>
                ))
              : tags[selectedTag].child.map((child, i) => (
                  <Flex
                    key={i}
                    color={tags[selectedTag].color}
                    my={1}
                    _hover={{ bg: "gray.100" }}
                    py={2}
                    px={6}
                    cursor="pointer"
                    bg={selectedChild === i ? "gray.100" : "whte"}
                    onClick={() => {
                      setSelectedChild(i);
                      setShowChildTag(true);
                    }}
                  >
                    <Box mt={1} mr={2}>
                      {child.icon}
                    </Box>
                    <Text textTransform="capitalize">
                      {child.name.replaceAll("-", " ")}
                    </Text>
                  </Flex>
                ))}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="tomato"
              mr={3}
              onClick={() => {
                onClose();
                setSelectedTags([
                  tags[selectedTag]?.name,
                  tags[selectedTag]?.child[selectedChild]?.name,
                ]);
              }}
              size="sm"
            >
              Confirm
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowChildTag(false);
                setSelectedChild(null);
                setSelectedTag(null);
              }}
            >
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
          {tags.map((tag, i) => (
            <TagLink tag={tag} key={i} />
          ))}
        </VStack>
      </GridItem>
    </>
  );
};

export const TagLink = ({ tag, i }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <HStack key={i}>
        {cloneElement(tag.icon, { color: tag.color })}
        <RouterNavLink
          to={`/home/${tag.name}`}
          onClick={onToggle}
          style={({ isActive }) => {
            return {
              color: isActive ? tag.color : "gray",
              fontWeight: isActive ? "bold" : "normal",
            };
          }}
        >
          <Text textTransform="capitalize" fontSize="sm">
            {tag.name.replaceAll("-", " ")}
          </Text>
        </RouterNavLink>
      </HStack>
      {tag.child.length > 0 && (
        <Collapse in={isOpen}>
          <VStack align="start" ml={3}>
            {tag.child.map((child, i) => (
              <HStack key={i}>
                <RouterNavLink
                  to={`/home/${tag.name}:${child.name}`}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? tag.color : "gray",
                      fontWeight: isActive ? "bold" : "normal",
                    };
                  }}
                >
                  <Flex>
                    <Box mt={1}>{child.icon}</Box>
                    <Text ml={2} fontSize="sm" textTransform="capitalize">
                      {child.name}
                    </Text>
                  </Flex>
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
  let params = useParams();
  const [commentCardData, setCommentCardData] = useState([]);
  useEffect(() => {
    const tag = params.tag.split(":");
    const q =
      tag.length === 1
        ? query(collection(db, "article"), where("tag1", "==", tag[0]))
        : query(collection(db, "article"), where("tag2", "==", tag[1]));
    const data = [];
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      setCommentCardData(data);
    });

    return () => {
      unsub();
    };
  }, [params.tag]);

  return (
    <>
      <GridItem colSpan={1}>
        <Flex mb="20px">
          <Button color="gray.500">Terakhir</Button>
          <Spacer />
          <IconButton color="gray.500" icon={<FiRefreshCcw />} mx="10px" />
          <IconButton color="gray.500" icon={<AiOutlineCheck />} />
        </Flex>

        {commentCardData.length === 0 ? (
          <Text>Sepertinya tidak ada postingan disini</Text>
        ) : (
          commentCardData.map((data, i) => (
            <Flex
              key={i}
              my="5px"
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
                  <Box
                    rounded="full"
                    bg="blue"
                    w="40px"
                    h="40px"
                    m="auto"
                  ></Box>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1} fontWeight="semibold">
                  <Text>{data.title}</Text>
                </GridItem>
                <GridItem colSpan={1} rowSpan={1}>
                  <Flex color="gray">
                    <BsFillReplyFill />
                    <Text fontSize="sm" ml="2px" fontWeight="medium">
                      {data.username}
                    </Text>
                    <Text fontSize="sm" ml="5px">
                      {data.timeStamp && <ConvertedTime timeStamp={data.timeStamp} />}
                    </Text>
                  </Flex>
                </GridItem>
              </Grid>
              <Spacer />
              {data.tag1 && <ItemCommentTag text={data.tag1} />}
              
              <ItemCommentTag text="General" colorScheme="blue" />
              <HStack w="80px" ml="20px">
                <FaComment />
                <Text>10</Text>
              </HStack>
            </Flex>
          ))
        )}
      </GridItem>
    </>
  );
};

export const ConvertedTime = ({ timeStamp }) => {
  const [text, setText] = useState("");
  const dataDate = timeStamp.toDate();

  const data = {
    y: dataDate.getFullYear(),
    m: dataDate.getMonth(),
    d: dataDate.getDay(),
    h: dataDate.getHours(),
    min: dataDate.getMinutes(),
  };

  useEffect(() => {
    const renderEveryMinutes = () => {
      const nowDate = new Date();
      const now = {
        y: nowDate.getFullYear(),
        m: nowDate.getMonth(),
        d: nowDate.getDay(),
        h: nowDate.getHours(),
        min: nowDate.getMinutes(),
      };

      if (data.min < now.min) setText(`berkomentar ${now.min - data.min} menit yang lalu`);
      else if (data.h < now.h) setText(`berkomentar ${now.h - data.h} jam yang lalu`);
      else if (data.d < now.d) setText(`berkomentar ${now.d - data.d} hari yang lalu`);
      else if (data.m < now.m) setText(`berkomentar ${now.m - data.m} bulan yang lalu`);
      else if (data.y < now.y) setText(`berkomentar ${now.y - data.y} tahun yang lalu`);
    };

    renderEveryMinutes();
    const interval = setInterval(renderEveryMinutes, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{text}</>;
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
      <ItemCommentTag text="Indo" colorScheme="red" />
      <ItemCommentTag text="General" colorScheme="blue" />
      <HStack w="80px" ml="20px">
        <FaComment />
        <Text>10</Text>
      </HStack>
    </Flex>
  );
};

export const ItemCommentTag = (props) => {
  return (
    <Center>
      <Tag
        size="sm"
        h="10px"
        variant="subtle"
        colorScheme={props.colorScheme}
        color="white"
        {...props}
      >
        {props.icon}
        <TagLabel ml={1} color="white">
          {props.text}
        </TagLabel>
      </Tag>
    </Center>
  );
};
