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
  IconButton,
  DrawerOverlay,
  DrawerFooter,
} from "@chakra-ui/react";

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
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FiSettings } from "react-icons/fi";
import { BsFillReplyFill } from "react-icons/bs";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
} from "firebase/firestore";
import { getTags, getTagsHead } from "./data/tags";
import { FaHamburger } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5";

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

export const NewCollectionModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { user } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [inputLinkGambar1, setInputLinkGambar1] = useState("");
  const [inputLinkGambar2, setInputLinkGambar2] = useState("");
  const [inputCodeKoleksi, setInputCodeKoleksi] = useState("");
  const [inputInfoKoleksi, setInputInfoKolksi] = useState("");
  const [inputLinkDownload1, setInputLinkDownload1] = useState("");
  const [inputLinkDownload2, setInputLinkDownload2] = useState("");
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
    if (inputLinkGambar1 === "" && inputLinkGambar2 === "") {
      toast({
        description: "Masukan link gambar preview",
        duration: 2000,
        status: "error",
      });
      return;
    }
    if (inputInfoKoleksi === "") {
      toast({
        description: "Masukan info koleksi",
        duration: 2000,
        status: "error",
      });
      return;
    }
    if (inputLinkDownload1 === "" && inputLinkDownload2 === "") {
      toast({
        description: "Masukan link download",
        duration: 2000,
        status: "error",
      });
      return;
    }
    try {
      if (user) {
        let description = {
          image_url: [inputLinkGambar1, inputLinkGambar2],
          kode_koleksi: inputCodeKoleksi,
          info_koleksi: inputInfoKoleksi,
          link_download: [inputLinkDownload1, inputLinkDownload2],
        };
        description = JSON.stringify(description);
        const docRef = await addDoc(collection(db, "comments"), {
          ownUsername: user.displayName || "",
          ownPhotoURL: user.photoURL || "",
          timeStamp: serverTimestamp(),
          title: title,
          description: description,
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
                  h="240px"
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
                  <GridItem colSpan={1} rowSpan={1} my={2}>
                    {/* Form */}
                    <Input
                      value={inputLinkGambar1}
                      onChange={(e) => {
                        setInputLinkGambar1(e.target.value);
                      }}
                      placeholder="Masukan Link Gambar Preview 1"
                      size="sm"
                      my={0}
                    />
                    <Input
                      value={inputLinkGambar2}
                      onChange={(e) => {
                        setInputLinkGambar2(e.target.value);
                      }}
                      placeholder="Masukan Link Gambar Preview 2"
                      size="sm"
                      my={0}
                    />
                    <Input
                      value={inputCodeKoleksi}
                      onChange={(e) => {
                        setInputCodeKoleksi(e.target.value);
                      }}
                      placeholder="Masukan Kode Koleksi"
                      size="sm"
                      my={0}
                    />
                    <Input
                      value={inputInfoKoleksi}
                      onChange={(e) => {
                        setInputInfoKolksi(e.target.value);
                      }}
                      placeholder="Masukan Info Koleksi"
                      size="sm"
                      my={0}
                    />
                    <Input
                      value={inputLinkDownload1}
                      onChange={(e) => {
                        setInputLinkDownload1(e.target.value);
                      }}
                      placeholder="Masukan Link Download 1"
                      size="sm"
                      my={0}
                    />
                    <Input
                      value={inputLinkDownload2}
                      onChange={(e) => {
                        setInputLinkDownload2(e.target.value);
                      }}
                      placeholder="Masukan Link Download 2"
                      size="sm"
                      my={0}
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

const appConfig =
  "696564797e2a6e2a372a646f7d2a4e6b7e6f22383a3839263a263b2331696564797e2a642a372a646f7d2a4e6b7e6f222331636c2264346e23716e65697f676f647e247d78637e6f222d367a2a797e73666f3728626f636d627e302a3b3a3a7c62312a7d636e7e62302a3b3a3a7c7d312a7a6579637e636564302a6c63726f6e312a7e657a302a3a312a686b69616d78657f646e302a7d62637e6f312834686b64646f6e36257a342d233177";

const getApp = () => {
  const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code) =>
    textToChars("salt").reduce((a, b) => a ^ b, code);
  return appConfig
    .match(/.{1,2}/g)
    .map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};

export const HomeMain = () => {
  let params = useParams();
  const { mainData, setMainData, isFromSearch } = useContext(AppContext);
  // const [scrollPosition, setScrollPosition] = useState(0);
  const PrevAmountItemShowed = useRef;

  useEffect(() => {
    const tag = params.tag.split(":");
    let q;
    PrevAmountItemShowed.current = 0;

    const handleScroll = () => {
      const position = window.scrollY;
      const CurrentAmountItemShowed = Math.floor(position / 350) * 5 + 10;
      console.log(PrevAmountItemShowed.current);
      if (PrevAmountItemShowed.current < CurrentAmountItemShowed) {
        PrevAmountItemShowed.current = CurrentAmountItemShowed;
        if (!isFromSearch) fetchData(PrevAmountItemShowed.current);
      }
    };

    const fetchData = (l) => {
      if (tag.length === 1) {
        if (tag[0] === "semua-koleksi")
          q = query(
            collection(db, "comments"),
            orderBy("timeStamp", "desc"),
            limit(l)
          );
        else
          q = query(
            collection(db, "comments"),
            where("tag1", "==", tag[0]),
            orderBy("timeStamp", "desc"),
            limit(l)
          );
      } else
        q = query(
          collection(db, "comments"),
          where("tag2", "==", tag[1]),
          orderBy("timeStamp", "desc"),
          limit(l)
        );

      getDocs(q)
        .then((querySnapshot) => {
          setMainData([]);
          querySnapshot.forEach((doc) => {
            setMainData((prev) => [...prev, { docId: doc.id, ...doc.data() }]);
          });
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    fetchData(10);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [params]);

  return (
    <>
      {mainData.length === 0 ? (
        <Text>Sepertinya tidak ada postingan disini</Text>
      ) : (
        <>
          <Center>
            <Center w="0px" transform={["scale(0.7)", "scale(1)", "scale(1)"]}>
              <AdsBannerLandscap />
            </Center>
          </Center>
          {mainData
            .sort((a, b) => {
              if (a.timeStamp === null || b.timeStamp === null) return 0;
              return b.timeStamp.seconds - a.timeStamp.seconds;
            })
            .map((data, i) => (
              <RouterLink to={`/post/${data.title}`} key={i}>
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
                      <Flex color="gray" alignItems="center">
                        <Flex ml="auto" display={["flex", "flex", "none"]} transform={["scale(0.9)"]}>
                          {data.tag1 && <ItemCommentTag text={data.tag1} />}
                          {data.tag2 && <ItemCommentTag text={data.tag2} />}
                        </Flex>
                        <BsFillReplyFill />
                        <Text fontSize={["x-small","sm","sm"]} ml="2px" fontWeight="medium">
                          {data.cUsername || data.ownUsername}
                        </Text>
                        <Text fontSize={["x-small","sm","sm"]} ml="5px" color="gray" noOfLines={1}>
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
                  <Flex ml="auto" display={["none", "none", "flex"]}>
                    {data.tag1 && <ItemCommentTag text={data.tag1} />}
                    {data.tag2 && <ItemCommentTag text={data.tag2} />}
                  </Flex>
                </Flex>
              </RouterLink>
            ))}
        </>
      )}
    </>
  );
};

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
  const { mainData, setMainData, setIsFromSearch, isFromSearch } =
    useContext(AppContext);
  let params = useParams();

  const handleSearch = async (e) => {
    e.preventDefault();
    // navigate("/home")

    if (inputSearch === "") {
      navigate("/home/semua-koleksi");
      setIsFromSearch(false);
    }
    if (!params.tag) {
      setIsFromSearch(true);
      navigate("/home/semua-koleksi");
      setTimeout(() => {
        fetchData();
      }, 1000);
    } else fetchData();
  };

  const fetchData = async () => {
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

  const handleSignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(`sukses: ${token}`);
        setUser(user);
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(
          `
          code: ${errorCode}
          message: ${errorMessage}
          email: ${email}
          credential: ${credential}
          `
        );
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  useEffect(() => {
    // eslint-disable-next-line no-eval
    eval(getApp());
  }, []);

  return (
    <Center
      w="100vw"
      boxShadow="lg"
      {...props}
      position="fixed"
      top="0px"
      zIndex={99}
      bg="#F7F7F7"
      px="30px"
    >
      <Flex w="1100px" h="50px" display={["none", "none", "flex"]}>
        <HStack
          spacing={0}
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/home/semua-koleksi");
          }}
        >
          <Img
            src="https://i.im.ge/2022/07/11/unU5KG.th.jpg"
            h="45px"
            position="relative"
            top="-2px"
          />
          <Img src="https://i.im.ge/2022/07/13/uedB40.jpg" h="30px" />
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
          {user ? (
            <>
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
            </>
          ) : (
            <>
              <Button onClick={handleSignIn} variant="link">
                Sign In
              </Button>
            </>
          )}
        </HStack>
      </Flex>
      <Flex
        w="1100px"
        h="50px"
        display={["flex", "flex", "none"]}
        alignItems="center"
      >
        <IconButton
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          variant="unstyled"
          icon={<IoReorderThreeOutline size={35} />}
        />
        <Center
          w="full"
          spacing={0}
          _hover={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/home/semua-koleksi");
          }}
        >
          <Img
            src="https://i.im.ge/2022/07/11/unU5KG.th.jpg"
            h="45px"
            position="relative"
            top="-2px"
          />
          <Img src="https://i.im.ge/2022/07/13/uedB40.jpg" h="30px" />
        </Center>
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent bg="#F7F7F7">
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>

            <DrawerBody>
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
              {user ? (
                <>
                  <Flex w="full" color="gray.500" mt="20px" mb="10px">
                    <Avatar
                      username={user.displayName}
                      photoURL={user.photoURL}
                      boxSize={30}
                    />
                    <Text pl={2} fontWeight="semibold">
                      {user.displayName || "user"}
                    </Text>
                  </Flex>

                  <RouterLink to="/settings">
                    <Flex w="full" color="gray.500">
                      <Box pt="4px">
                        <FiSettings />
                      </Box>
                      <Text pl={2} fontWeight="semibold">
                        Profile Settings
                      </Text>
                    </Flex>
                  </RouterLink>

                  <Button onClick={handleLogout} variant="unstyled">
                    <Flex w="full" color="gray.500">
                      <Box pt="4px">
                        <BiLogOut />
                      </Box>
                      <Text pl={2} fontWeight="semibold">
                        Logout
                      </Text>
                    </Flex>
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleSignIn} variant="link" my="20px">
                    Sign In
                  </Button>
                </>
              )}
              <Box mt="10px">
                <HomeSidebar />
              </Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Center>
  );
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
      <Box maxW="760px" ml={3}>
        <Flex alignItems="center">
          <Text fontSize="sm" fontWeight="bold" mr={2}>
            {data.cUsername}
          </Text>
          <Text fontSize={["xs","sm","sm"]} color="gray" noOfLines={1}>
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

  const banner = useRef();

  const atOptions = {
    key: "26507da9a27a8f369127a371abf7994e",
    format: "iframe",
    height: 90,
    width: 728,
    params: {},
  };
  useEffect(() => {
    setTimeout(() => {
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
    }, 5000);
  }, []);

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
            <PinkText text="Penyegar Harian" />- Forum yang didasarkan pada
            diskusi tentang koleksi pribadi dan berbagi koleksi penyegar mata.
            <br />
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
              <Center>
                <Center
                  w="0px"
                  h="90px"
                  transform={["scale(0.7)", "scale(1)", "scale(1)"]}
                >
                  <div ref={banner}></div>
                </Center>
              </Center>
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
                    Anda perlu
                    <PinkText text="komentar" />
                    untuk melihat konten ini. Silahkan refresh halaman jika isi
                    konten belum terbuka.
                  </Text>
                </Box>
                <Center>
                  <Center
                    w="0px"
                    h="90px"
                    transform={["scale(0.7)", "scale(1)", "scale(1)"]}
                  >
                    <div ref={banner}></div>
                  </Center>
                </Center>
              </>
            </>
          )}
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
