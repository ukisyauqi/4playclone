import React from "react";
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
} from "@chakra-ui/react";
import { FaGavel } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { BiSearchAlt2 } from "react-icons/bi";

export default function Navbar() {
  return (
    <Center w="calc(100vw - 17px)" h="50px" boxShadow="lg">
      <Flex w="1100px" h="50px">
        <HStack spacing={8}>
          <Image src="../../images/playLogo.png" h="30px"></Image>
          <Button variant="link" leftIcon={<FaGavel />}>
            Peraturan
          </Button>
          <Button variant="link" leftIcon={<AiFillStar />}>
            Upgrade
          </Button>
          <Button variant="link" leftIcon={<BsFillRecordCircleFill />}>
            Extra
          </Button>
        </HStack>
        <Spacer />
        <HStack>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<BiSearchAlt2 />}
            />
            <Input
              type="text"
              placeholder="Kotak Pencarian"
              bg="gray.100"
              w="200px"
            />
          </InputGroup>
          <Button variant="link" leftIcon={<BsFillRecordCircleFill />}>
            User
          </Button>
        </HStack>
      </Flex>
    </Center>
  );
}
