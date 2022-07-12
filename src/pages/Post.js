import { Box, Center, Flex, Tag, TagLabel, Text } from "@chakra-ui/react";

import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import {
  AdsBannerLandscap,
  ArticleComment,
  Avatar,
  CommentModal,
  Content,
  createMarkupAdsLandscape,
} from "../Components";
import { AppContext } from "../context";

export default function Post() {
  let params = useParams();

  const { mainData } = useContext(AppContext);
  const [articleData, setArticleData] = useState({});
  const [commentsData, setCommentsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const article = mainData.filter((data) => data.docId === params.docId)[0];
    const comments = mainData.filter((data) => data.title === article.title);

    setArticleData(article);
    setCommentsData(comments);

    return () => {};
  }, [mainData, params]);

  useEffect(() => {
    if (!articleData) {
      alert("data tidak ada");
      navigate("/home/semua-koleksi");
    }
    return () => {};
  }, []);

  return (
    <>
      <Center h="140px" bg={articleData.color || "#FF0080"}>
        <Box>
          <Center>
            <Tag size="sm" h="10px" variant="subtle" bg={"white"}>
              <TagLabel ml={1} color={articleData.color}>
                {articleData.tag1}
              </TagLabel>
            </Tag>
            {articleData.tag2 && (
              <Tag size="sm" h="10px" variant="subtle" bg={"white"} ml={1}>
                <TagLabel ml={1} color={articleData.color}>
                  {articleData.tag2}
                </TagLabel>
              </Tag>
            )}
          </Center>
          <Text color="white" fontSize="3xl" mt={1} align="center">
            {articleData.title}
          </Text>
        </Box>
      </Center>
      <Center>
        <Box w="1050px" h="90px">
          {/* <div dangerouslySetInnerHTML={createMarkupAdsLandscape()}></div> */}
          <AdsBannerLandscap />
        </Box>
      </Center>
      <Flex justifyContent="center" mt="30px">
        <Box pb={10}>
          <Flex borderBottom="1px solid #ddd" pb="15px">
            <Avatar
              boxSize={70}
              username={articleData.ownUsername}
              photoURL={articleData.photoURL}
            />
            <Box w="760px" ml={3}>
              <Flex>
                <Text fontSize="sm" fontWeight="bold">
                  {articleData.ownUsername}
                </Text>
              </Flex>
              <Box>
                <Content
                  text={articleData.description}
                  commentsData={commentsData}
                />
              </Box>
            </Box>
          </Flex>
          {commentsData.length < 2 ? (
            <Text>Belum Ada Komentar</Text>
          ) : (
            commentsData.map((data, i) => (
              <div key={i}>
                {data.cUsername && <ArticleComment data={data} />}
              </div>
            ))
          )}
        </Box>
        <Box h="100px" w="150px" ml="75px" pos="sticky" top="20">
          <CommentModal articleData={articleData} />
        </Box>
      </Flex>
    </>
  );
}
