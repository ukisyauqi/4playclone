import { Box, Center, Flex, Tag, TagLabel, Text } from "@chakra-ui/react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AdsBannerLandscap,
  ArticleComment,
  Avatar,
  CommentModal,
  Content,
} from "../Components";
import { AppContext } from "../context";
import { db } from "../firebase";

export default function Post() {
  const params = useParams();

  const { mainData } = useContext(AppContext);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const d = mainData.filter((data) => data.title === params.title);
    let unsub;
    if (d.length === 0 || !d) {
      const q = query(
        collection(db, "comments"),
        where("title", "==", params.title)
      );
      unsub = onSnapshot(
        q,
        (querySnapshot) => {
          setData([]);
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            setData((prev) => [...prev, doc.data()]);
          });
        },
        (error) => {
          console.log(error.message);
          navigate("/home/semua-koleksi");
        }
      );
    } else {
      setData(d);
    }
    return () => {
      if (unsub !== undefined) unsub();
    };
  }, []);

  return (
    <>
      {data.length !== 0 && (
        <>
          <Center h="140px" bg={data[0].color || "#FF0080"}>
            <Box>
              <Center>
                <Tag size="sm" h="10px" variant="subtle" bg={"white"}>
                  <TagLabel ml={1} color={data[0].color}>
                    {data[0].tag1}
                  </TagLabel>
                </Tag>
                {data[0].tag2 && (
                  <Tag size="sm" h="10px" variant="subtle" bg={"white"} ml={1}>
                    <TagLabel ml={1} color={data[0].color}>
                      {data[0].tag2}
                    </TagLabel>
                  </Tag>
                )}
              </Center>
              <Text color="white" fontSize="3xl" mt={1} align="center">
                {data[0].title}
              </Text>
            </Box>
          </Center>
          <Center>
            <Center w="full" h="90px">
              {/* <div dangerouslySetInnerHTML={createMarkupAdsLandscape()}></div> */}
              <AdsBannerLandscap />
            </Center>
          </Center>
          <Flex justifyContent="center" mt="30px">
            <Box pb={10}>
              <Flex borderBottom="1px solid #ddd" pb="15px">
                <Avatar
                  boxSize={70}
                  username={data[0].ownUsername}
                  photoURL={data[0].photoURL}
                />
                <Box w="760px" ml={3}>
                  <Flex>
                    <Text fontSize="sm" fontWeight="bold">
                      {data[0].ownUsername}
                    </Text>
                  </Flex>
                  <Box>
                    <Content text={data[0].description} commentsData={data} />
                  </Box>
                </Box>
              </Flex>
              {data.length < 2 ? (
                <Text>Belum Ada Komentar</Text>
              ) : (
                data.map((d, i) => (
                  <div key={i}>
                    {d.cUsername && <ArticleComment data={d} />}
                  </div>
                ))
              )}
            </Box>
            <Box h="100px" w="150px" ml="75px" pos="sticky" top="20">
              <CommentModal articleData={data[0]} />
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}
