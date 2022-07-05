import React from "react";
import {
  Box,
  Grid,
  GridItem,
  Button,
  VStack,
  Flex,
  Spacer,
  IconButton,
  Tag,
  TagLeftIcon,
  TagLabel,
  HStack,
  Text,
  Center,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import {
  AiOutlineCheck,
  AiFillAppstore,
  AiTwotoneShop,
  AiFillPieChart,
} from "react-icons/ai";
import {
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
  BsGenderAmbiguous,
  BsGenderFemale,
  BsFillShareFill,
  BsFillArchiveFill,
} from "react-icons/bs";
import { HiOutlineIdentification } from "react-icons/hi";
import { TbNotebook } from "react-icons/tb";
import { BiSupport, BiWorld, BiTestTube } from "react-icons/bi";
import { IoDiamond } from "react-icons/io5";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function Home() {
  return (
    <Box>
      <Grid
        m="auto"
        w="1050px"
        templateColumns="200px auto"
        gap="30px"
        minH="100vh"
        mt="30px"
      >
        {/* sidebar */}
        <GridItem colSpan={1}>
          <Button colorScheme="tomato" w="full">
            Koleksi baru
          </Button>
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
            <Button variant="link" leftIcon={<FaCommentDots />}>
              General
            </Button>
            <Button variant="link" leftIcon={<TbNotebook />}>
              Pengetahuan
            </Button>
            <Button variant="link" leftIcon={<BiSupport />}>
              Support
            </Button>
            <Button variant="link" leftIcon={<FaComments />}>
              Off Topic
            </Button>
            <Button variant="link" leftIcon={<IoDiamond />}>
              Koleksi VIP
            </Button>
            <Button variant="link" leftIcon={<FaPaintBrush />}>
              Koleksi 2D
            </Button>
            <Button variant="link" leftIcon={<FaGlobeAsia />}>
              Koleksi Asia
            </Button>
            <Button variant="link" leftIcon={<BiWorld />}>
              Koleksi Barat
            </Button>
            <Button variant="link" leftIcon={<BsGenderAmbiguous />}>
              Koleksi Mantap
            </Button>
            <Button variant="link" leftIcon={<BsGenderFemale />}>
              Koleksi Sexy
            </Button>
            <Button variant="link" leftIcon={<AiTwotoneShop />}>
              Market Place
            </Button>
            <Button variant="link" leftIcon={<BsFillShareFill />}>
              Promosi
            </Button>
            <Button variant="link" leftIcon={<FaHandshake />}>
              Request
            </Button>
            <Button variant="link" leftIcon={<BiTestTube />}>
              Test Posting
            </Button>
            <Button variant="link" leftIcon={<BsFillArchiveFill />}>
              Archive
            </Button>
          </VStack>
        </GridItem>
        <GridItem colSpan={1}>
          <Flex mb="20px">
            <Button color="gray.500">Terakhir</Button>
            <Spacer />
            <IconButton color="gray.500" icon={<FiRefreshCw />} mx="10px" />
            <IconButton color="gray.500" icon={<AiOutlineCheck />} />
          </Flex>
          <ItemComment />
          <ItemComment />
          <ItemComment />
          <ItemComment />
          <ItemComment />
          <ItemComment />
        </GridItem>
      </Grid>
    </Box>
  );
}

function ItemComment(props) {
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
}

function ItemsTag(props) {
  return (
    <Center>
      <Tag size="sm" h="10px" variant="subtle" colorScheme={props.colorScheme}>
        <TagLeftIcon boxSize="12px" />
        <TagLabel>{props.text}</TagLabel>
      </Tag>
    </Center>
  );
}
