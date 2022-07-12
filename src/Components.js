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
  TagLabel,
  Img,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Textarea,
  Collapse,
  useToast,
  MenuDivider,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import { BiLogOut, BiReply, BiSearchAlt2 } from "react-icons/bi";
import {
  useNavigate,
  NavLink as RouterNavLink,
  Link as RouterLink,
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
import { FiSettings } from "react-icons/fi";
import { FaGavel } from "react-icons/fa";
import { BsFillReplyFill, BsFillRecordCircleFill } from "react-icons/bs";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { getTags, getTagsHead } from "./data/tags";

export const Navbar = (props) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const toast = useToast();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        toast({
          description: error.message,
          duration: 2000,
          status: "error",
        });
      });
  };

  const [inputSearch, setInputSearch] = useState("");

  const { setMainData } = useContext(AppContext);

  const handleSearch = async (e) => {
    e.preventDefault();
    // navigate("/home")
    if (inputSearch === "") navigate("/home/semua-koleksi");
    try {
      setMainData([]);
      const q = query(
        collection(db, "comments"),
        where("title", "==", inputSearch)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setMainData((prev) => [...prev, { docId: doc.id, ...doc.data() }]);
      });
    } catch (e) {}
  };

  return (
    <Center
      w="calc(100vw - 17px)"
      boxShadow="lg"
      {...props}
      position="fixed"
      top="0px"
      zIndex={99}
      bg="#F7F7F7"
    >
      <Flex w="1100px" h="50px">
        <HStack spacing={8}>
          <Img
            src="https://i.im.ge/2022/07/11/unU5KG.th.jpg"
            h="30px"
            _hover={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/home/semua-koleksi");
            }}
          />

          {user && (
            <>
              <RouterLink to="/peraturan">
                <Button variant="link" leftIcon={<FaGavel />}>
                  Peraturan
                </Button>
              </RouterLink>
              <RouterLink to="/upgrade">
                <Button variant="link" leftIcon={<AiFillStar />}>
                  Upgrade
                </Button>
              </RouterLink>
              <RouterLink to="/extra">
                <Button variant="link" leftIcon={<BsFillRecordCircleFill />}>
                  Extra
                </Button>
              </RouterLink>
            </>
          )}
        </HStack>
        <Spacer />
        <HStack spacing={8}>
          <form>
            <InputGroup mr={5} size="sm">
              <InputLeftElement
                pointerEvents="none"
                children={<BiSearchAlt2 />}
              />

              <Input
                type="text"
                placeholder="Kotak Pencarian"
                bg="gray.100"
                value={inputSearch}
                onChange={(e) => setInputSearch(e.target.value)}
                autoComplete="off"
              />
              <Input
                type="submit"
                onClick={handleSearch}
                visibility="hidden"
                position="absolute"
              />
            </InputGroup>
          </form>
          {user && (
            <Menu>
              <MenuButton as={Link}>
                <Flex position="relative">
                  <Avatar
                    username={user.displayName}
                    photoURL={user.photoURL}
                    boxSize={30}
                    position="absolute"
                    left="-25px"
                  />
                  <Text mt="3px" ml="10px">
                    {user.displayName || "user"}
                  </Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <RouterLink to="/settings">
                  <MenuItem>
                    <Flex w="full" color="gray.500">
                      <Box pt="4px">
                        <FiSettings />
                      </Box>
                      <Text pl={2} fontWeight="semibold">
                        Profile Settings
                      </Text>
                    </Flex>
                  </MenuItem>
                </RouterLink>

                <MenuDivider />
                <MenuItem onClick={handleLogout}>
                  <Flex w="full" color="gray.500">
                    <Box pt="4px">
                      <BiLogOut />
                    </Box>
                    <Text pl={2} fontWeight="semibold">
                      Logout
                    </Text>
                  </Flex>
                </MenuItem>
              </MenuList>
            </Menu>
          )}
          {!user && <SignupButton />}
          {!user && <LoginButton />}
        </HStack>
      </Flex>
    </Center>
  );
};

export const Avatar = ({ photoURL, boxSize, username, ...props }) => {
  const colors = ["#7BDFF2", "#B2F7EF", "#EFF7F6", "#F7D6E0", "#F2B5D4"];
  return (
    <Box {...props}>
      {photoURL ? (
        <>
          <Image
            src={photoURL}
            boxSize={boxSize + "px" || "40px"}
            rounded="full"
          />
        </>
      ) : (
        <>
          {username ? (
            <Center
              rounded="full"
              w={boxSize + "px" || "40px"}
              h={boxSize + "px" || "40px"}
              bg={colors[(username.charCodeAt(0) % 5) - 1] || "#437F97"}
            >
              <Text
                color="white"
                textTransform="uppercase"
                fontSize={boxSize / 2 + "px"}
              >
                {username[0] || ""}
              </Text>
            </Center>
          ) : (
            <>
              <Center
                rounded="full"
                w={boxSize + "px" || "40px"}
                h={boxSize + "px" || "40px"}
                bg="#437F97"
              ></Center>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export const LoginButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(AppContext);
  const toast = useToast();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        onClose();
      })
      .catch((error) => {
        setUser(null);
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
                bg="white"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
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
  const toast = useToast();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: username,
        })
          .then(() => {
            setUser(auth.currentUser);
            onClose();
          })
          .catch(() => {
            setUser(auth.currentUser);
            onClose();
          });
      })
      .catch((error) => {
        setUser(null);
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
                bg="white"
                placeholder="Username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                bg="white"
                placeholder="Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
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
        </ModalContent>
      </Modal>
    </>
  );
};

export const NewCollectionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const tags = getTags();
  const toast = useToast();

  const handlePosting = async () => {
    if (title === "") {
      toast({
        description: "Judul tidak boleh kosong",
        duration: 2000,
        status: "error",
      });
      return;
    }
    if (selectedTags.length === 0) {
      toast({
        description: "Tag tidak ada yang dipilih",
        duration: 2000,
        status: "error",
      });
      return;
    }
    if (description === "") {
      toast({
        description: "Deskripsi tidak boleh kosong",
        duration: 2000,
        status: "error",
      });
      return;
    }
    try {
      if (user) {
        const docRef = await addDoc(collection(db, "comments"), {
          ownUsername: user.displayName || "",
          ownPhotoURL: user.photoURL || "",
          timeStamp: serverTimestamp(),
          title: title,
          description: "{" + description + "}",
          tag1: selectedTags[0] || "",
          tag2: selectedTags[1] || "",
          comment: null,
          cUsername: null,
          cPhotoURL: null,
          color: tags.filter((tag) => tag.name === selectedTags[0])[0].color,
        });
        console.log("Document written with ID: ", docRef.id);
        onClose();
      }
    } catch (e) {
      toast({
        description: e.message,
        duration: 2000,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTitle("");
      setDescription(
        '"image_url":["𝐡𝐭𝐭𝐩𝐬://𝐥𝐢𝐧𝐤-𝟏","𝐡𝐭𝐭𝐩𝐬://𝐥𝐢𝐧𝐤-𝟐"],\n"kode_koleksi":"𝐦𝐚𝐬𝐮𝐤𝐚𝐧 𝐤𝐨𝐝𝐞 𝐤𝐨𝐥𝐞𝐤𝐬𝐢",\n"info_koleksi":"𝐦𝐚𝐬𝐮𝐤𝐚𝐧 𝐢𝐧𝐟𝐨 𝐤𝐨𝐥𝐞𝐤𝐬𝐢",\n"link_download":["𝐡𝐭𝐭𝐩𝐬://𝐥𝐢𝐧𝐤-𝟏","𝐡𝐭𝐭𝐩𝐬://𝐥𝐢𝐧𝐤-𝟐"]'
      );
      setSelectedTags([]);
    } else {
    }

    return () => {};
  }, [isOpen]);

  return (
    <>
      <Button
        ref={btnRef}
        onClick={() => {
          user
            ? onOpen()
            : toast({
                description: "Anda harus login terlebih dahulu",
                status: "error",
                duration: 2000,
              });
        }}
        colorScheme="tomato"
        w="full"
      >
        Koleksi Baru
      </Button>
      {user && (
        <>
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
                    <Avatar
                      boxSize={70}
                      photoURL={user.photoURL}
                      username={user.displayName}
                    />
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
                      fontFamily="monospace"
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
      )}
    </>
  );
};

export const PilihTagMenu = ({ setSelectedTags, setSelectedColor }) => {
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
  const headTags = getTagsHead();
  return (
    <>
      <GridItem colSpan={1}>
        <NewCollectionModal />
        <VStack align="start" color="gray.500" mt="20px">
          {headTags.map((tag, i) => (
            <HStack key={i}>
              {cloneElement(tag.icon, { color: "#1572A1" })}
              <RouterNavLink
                to={`/home/${tag.name}`}
                style={({ isActive }) => {
                  return {
                    fontWeight: isActive ? "bold" : "normal",
                  };
                }}
              >
                <Text textTransform="capitalize" fontSize="sm">
                  {tag.name.replaceAll("-", " ")}
                </Text>
              </RouterNavLink>
            </HStack>
          ))}
        </VStack>
        <VStack align="start" color="gray.400" mt="30px">
          {tags.map((tag, i) => (
            <TagLink tag={tag} key={i} />
          ))}
        </VStack>
        <Box w="160px" h="600px" my="20px">
          {/* <div dangerouslySetInnerHTML={createMarkuoAdsPotrait()}></div> */}
          <AdsBannerPotrait />
        </Box>
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
  const { mainData, setMainData } = useContext(AppContext);

  useEffect(() => {
    const tag = params.tag.split(":");
    let q;

    if (tag.length === 1) {
      if (tag[0] === "semua-koleksi") q = query(collection(db, "comments"));
      else q = query(collection(db, "comments"), where("tag1", "==", tag[0]));
    } else q = query(collection(db, "comments"), where("tag2", "==", tag[1]));

    const unsub = onSnapshot(q, (querySnapshot) => {
      setMainData([]);
      querySnapshot.forEach((doc) => {
        setMainData((prev) => [...prev, { docId: doc.id, ...doc.data() }]);
      });
    });

    return () => {
      unsub();
    };
  }, [params]);

  return (
    <>
      <GridItem colSpan={1}>
        {mainData.length === 0 ? (
          <Text>Sepertinya tidak ada postingan disini</Text>
        ) : (
          <>
            <Box w="full" h="90px">
              {/* <div dangerouslySetInnerHTML={createMarkupAdsLandscape()} /> */}
              <AdsBannerLandscap />
            </Box>
            {mainData
              .sort((a, b) => {
                if (a.timeStamp === null || b.timeStamp === null) return 0;
                return b.timeStamp.seconds - a.timeStamp.seconds;
              })
              .map((data, i) => (
                <RouterLink to={`/post/${data.docId}`} key={i}>
                  <Flex
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
                        <Avatar
                          username={data.cUsername || data.ownUsername}
                          boxSize={40}
                          photoURL={data.cPhotoURL}
                        />
                      </GridItem>
                      <GridItem colSpan={1} rowSpan={1} fontWeight="semibold">
                        <Text>{data.title}</Text>
                      </GridItem>
                      <GridItem colSpan={1} rowSpan={1}>
                        <Flex color="gray">
                          <BsFillReplyFill />
                          <Text fontSize="sm" ml="2px" fontWeight="medium">
                            {data.cUsername || data.ownUsername}
                          </Text>
                          <Text fontSize="sm" ml="5px" color="gray">
                            {data.timeStamp && (
                              <ConvertedTime
                                timeStamp={data.timeStamp}
                                isComment={data.cUsername}
                              />
                            )}
                          </Text>
                        </Flex>
                      </GridItem>
                    </Grid>
                    <Spacer />
                    {data.tag1 && <ItemCommentTag text={data.tag1} />}
                    {data.tag2 && <ItemCommentTag text={data.tag2} />}
                  </Flex>
                </RouterLink>
              ))}
          </>
        )}
      </GridItem>
    </>
  );
};

export function createMarkupAdsLandscape() {
  return {
    __html: `
  <script type="text/javascript">
      atOptions = {
        key: "26507da9a27a8f369127a371abf7994e",
        format: "iframe",
        height: 90,
        width: 728,
        params: {},
      };
      document.write(
        "<scr" +
          'ipt type="text/javascript" src="http' +
          (location.protocol === "https:" ? "s" : "") +
          '://www.topdisplayformat.com/26507da9a27a8f369127a371abf7994e/invoke.js"></scr' +
          "ipt>"
      );
    </script>
  `,
  };
}

export function createMarkuoAdsPotrait() {
  return {
    __html: `
  <script type="text/javascript">
      atOptions = {
        key: "b9aed9c49bcbdeeb04cb6edd92bc5911",
        format: "iframe",
        height: 600,
        width: 160,
        params: {},
      };
      document.write(
        "<scr" +
          'ipt type="text/javascript" src="http' +
          (location.protocol === "https:" ? "s" : "") +
          '://www.topdisplayformat.com/b9aed9c49bcbdeeb04cb6edd92bc5911/invoke.js"></scr' +
          "ipt>"
      );
    </script>
  `,
  };
}

export const ConvertedTime = ({ timeStamp, isComment }) => {
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

      const awalan = isComment ? "berkomentar" : "memposting";
      if (data.y < now.y)
        setText(`${awalan} ${now.y - data.y} tahun yang lalu`);
      else if (data.m < now.m)
        setText(`${awalan} ${now.m - data.m} bulan yang lalu`);
      else if (data.d < now.d)
        setText(`${awalan} ${now.d - data.d} hari yang lalu`);
      else if (data.h < now.h)
        setText(`${awalan} ${now.h - data.h} jam yang lalu`);
      else if (data.min < now.min)
        setText(`${awalan} ${now.min - data.min} menit yang lalu`);
      else setText(`${awalan} baru saja`);
    };

    renderEveryMinutes();
    const interval = setInterval(renderEveryMinutes, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{text}</>;
};

export const ItemCommentTag = (props) => {
  const tags = getTags();
  const tagIndex = tags.findIndex((tag) => tag.name === props.text);
  return (
    <Center>
      <Tag
        size="sm"
        h="10px"
        variant="subtle"
        bg={tagIndex > 0 ? tags[tagIndex].color : "gray.300"}
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

export const Lorem = (props) => {
  return (
    <>
      <Text>{"a".repeat(props.size)}</Text>
    </>
  );
};

export const ArticleComment = ({ data, key }) => {
  return (
    <Flex key={key} borderBottom="1px solid #ddd" py="15px">
      <Avatar
        username={data.cUsername}
        boxSize="70"
        photoURL={data.cPhotoURL}
      />
      <Box w="760px" ml={3}>
        <Flex>
          <Text fontSize="sm" fontWeight="bold" mr={2}>
            {data.cUsername}
          </Text>
          <Text fontSize="sm" color="gray">
            {data.timeStamp && (
              <ConvertedTime
                timeStamp={data.timeStamp}
                isComment={data.cUsername}
              />
            )}
          </Text>
        </Flex>
        <Text fontSize="sm" my={2}>
          {data.comment}
        </Text>
      </Box>
    </Flex>
  );
};

export const CommentModal = ({ articleData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user, setMainData } = useContext(AppContext);
  const [comment, setComment] = useState("");
  const toast = useToast();

  const handlePosting = async () => {
    if (comment === "") {
      toast({
        description: "Komen tidak boleh kosong",
        status: "error",
        duration: 2000,
      });
      return;
    }
    if (comment.length > 100) {
      toast({
        description: "Komen tidak boleh lebih dari 100 karakter",
        status: "error",
        duration: 2000,
      });
      return;
    }
    try {
      if (user) {
        const data = {
          ownUsername: articleData.ownUsername || "",
          ownPhotoURL: articleData.ownPhotoURL || "",
          timeStamp: serverTimestamp(),
          title: articleData.title,
          description: articleData.description,
          tag1: articleData.tag1,
          tag2: articleData.tag2,
          comment: comment,
          cUsername: user.displayName || "",
          cPhotoURL: user.photoURL || "",
          color: articleData.color,
        };
        const docRef = await addDoc(collection(db, "comments"), data);
        console.log("Document written with ID: ", docRef.id);
        setMainData((prev) => [
          { docId: docRef.id, ...data, timeStamp: new Timestamp() },
          ...prev,
        ]);
        onClose();
      }
    } catch (e) {
      toast({
        description: e.message,
        duration: 2000,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      setComment("");
    } else {
    }

    return () => {};
  }, [isOpen]);

  return (
    <>
      <Button
        ref={btnRef}
        onClick={() => {
          user
            ? onOpen()
            : toast({
                description: "Anda harus login terlebih dahulu",
                status: "error",
                duration: 2000,
              });
        }}
        colorScheme="tomato"
        w="full"
      >
        Komentar
      </Button>
      {user && (
        <>
          <Drawer
            isOpen={isOpen}
            placement="bottom"
            onClose={onClose}
            finalFocusRef={btnRef}
            blockScrollOnMount={false}
          >
            <DrawerContent
              w="68vw"
              ml="7vw"
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
                    <Avatar
                      username={user.displayName}
                      photoURL={user.photoURL}
                      boxSize={70}
                    />
                  </GridItem>
                  <GridItem colSpan={1} rowSpan={1} display="flex">
                    <BiReply />
                    <Text>{articleData.title}</Text>
                  </GridItem>
                  <GridItem colSpan={1} rowSpan={1}>
                    <Textarea
                      type="text"
                      w="full"
                      minH="170px"
                      variant="unstyled"
                      placeholder="Tulis Komentar..."
                      size="sm"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
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
      )}
    </>
  );
};

export const Content = ({ text, commentsData }) => {
  const { user } = useContext(AppContext);
  const [commented, setCommented] = useState(false);
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = null;
  }

  useEffect(() => {
    setCommented(
      user
        ? commentsData.some((data) => data.cUsername === user.displayName)
        : false
    );
    return () => {};
  }, [commentsData, user]);

  return (
    <>
      {data && (
        <>
          {data.image_url.map((url, i) => (
            <Image src={url} w="full" my={1} key={i} />
          ))}
          <Box borderLeft="3px solid #FF0080" roundedLeft="md" p={2} my={6}>
            <Text fontWeight="bold" fontSize="sm">
              Kode Koleksi
            </Text>
            <Text fontSize="sm">{data.kode_koleksi}</Text>
          </Box>
          <Box borderLeft="2px solid #0089FF" roundedLeft="md" p={2} my={6}>
            <Text fontWeight="bold" fontSize="sm">
              Info Koleksi
            </Text>
            <Text fontSize="sm">{data.info_koleksi}</Text>
          </Box>

          <Text align="center" fontSize="sm">
            Download secara gratis di
            <PinkText text="4Play" />- Forum yang didasarkan pada diskusi
            tentang koleksi pribadi dan berbagi koleksi penyegar mata. <br />
            <Text as="span" textDecoration="underline">
              Jangan lupa untuk membagikan tautan ke teman-teman Anda!!
            </Text>
          </Text>

          {user && commented ? (
            <>
              <Box borderLeft="2px solid #4AA84A" roundedLeft="md" p={2} my={6}>
                <Text fontWeight="bold" fontSize="sm">
                  Link Download
                </Text>
                {data.link_download.map((url, i) => (
                  <div key={i}>
                    <Link fontSize="sm" color="#FF0080" href={url}>
                      {url}
                    </Link>
                  </div>
                ))}
              </Box>
            </>
          ) : (
            <>
              <>
                <Box
                  borderLeft="2px solid #4AA84A"
                  roundedLeft="md"
                  p={2}
                  my={6}
                >
                  <Text fontWeight="bold" fontSize="sm" align="center">
                    Anda perlu <PinkText text="komentar" />
                    untuk melihat konten ini. Silahkan refresh halaman jika isi
                    konten belum terbuka. <PinkText text="Upgrade Membership" />
                    — <PinkText text="Peraturan" /> —
                    <PinkText text="Discord Server" />
                  </Text>
                </Box>
              </>
            </>
          )}
          <Box
            borderLeft="2px solid #4AA84A"
            roundedLeft="md"
            p={2}
            my={6}
            display="none"
          >
            <Text fontWeight="bold" fontSize="sm">
              Link Download
            </Text>
            {data.link_download.map((url, i) => (
              <div key={i}>
                <Link fontSize="sm" color="#FF0080">
                  {url}
                </Link>
              </div>
            ))}
          </Box>
          <Box w="full" h="90px">
            {/* <div dangerouslySetInnerHTML={createMarkupAdsLandscape()}></div> */}
            <AdsBannerLandscap />
          </Box>
        </>
      )}
    </>
  );
};

export const PinkText = ({ text }) => (
  <Text
    as="span"
    color="#FF0080"
    mx={1}
    textDecoration="underline"
    textDecorationColor="gray.200"
    _hover={{ textDecorationColor: "#FF0080" }}
    textUnderlineOffset="5px"
  >
    {text}
  </Text>
);

export function AdsBannerLandscap() {
  const banner = useRef();

  const atOptions = {
    key: "26507da9a27a8f369127a371abf7994e",
    format: "iframe",
    height: 90,
    width: 728,
    params: {},
  };
  useEffect(() => {
    if (!banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.topdisplayformat.com/26507da9a27a8f369127a371abf7994e/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      if (banner.current) {
        banner.current.append(conf);
        banner.current.append(script);
      }
    }
  }, []);

  return <div ref={banner}></div>;
}

export function AdsBannerPotrait() {
  const banner = useRef();

  const atOptions = {
    key: "b9aed9c49bcbdeeb04cb6edd92bc5911",
    format: "iframe",
    height: 600,
    width: 160,
    params: {},
  };
  useEffect(() => {
    if (!banner.current.firstChild) {
      const conf = document.createElement("script");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `//www.topdisplayformat.com/b9aed9c49bcbdeeb04cb6edd92bc5911/invoke.js`;
      conf.innerHTML = `atOptions = ${JSON.stringify(atOptions)}`;

      if (banner.current) {
        banner.current.append(conf);
        banner.current.append(script);
      }
    }
  }, []);

  return <div ref={banner}></div>;
}
