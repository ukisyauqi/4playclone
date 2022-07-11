import {
  AiFillAppstore,
  AiFillStar,
  AiOutlineQuestionCircle,
  AiOutlineShoppingCart,
  AiOutlineTwitter,
} from "react-icons/ai";
import { BiShare, BiSupport, BiTestTube, BiWorld } from "react-icons/bi";
import {
  BsCardImage,
  BsDiscord,
  BsFillArchiveFill,
  BsFillBookFill,
  BsFillReplyFill,
  BsGenderAmbiguous,
  BsGenderFemale,
  BsInstagram,
  BsTelegram,
} from "react-icons/bs";
import {
  FaCommentDots,
  FaComments,
  FaFeatherAlt,
  FaGavel,
  FaGlobeAsia,
  FaHandshake,
  FaMask,
  FaPaintBrush,
  FaRegComments,
  FaTheaterMasks,
} from "react-icons/fa";
import { HiOutlineIdentification, HiSpeakerphone } from "react-icons/hi";
import {
  IoDiamond,
  IoHeartCircleSharp,
  IoLogoTiktok,
  IoTicketSharp,
} from "react-icons/io5";
import {
  TbLetterC,
  TbLetterI,
  TbLetterJ,
  TbLetterK,
  TbLetterM,
  TbLetterV,
  TbLivePhoto,
  TbNotebook,
  TbPropeller,
  TbSocial,
  TbWorld,
} from "react-icons/tb";

export const getTagsHead = () => [
  {
    name: "semua-koleksi",
    icon: <FaRegComments />,
  },
  {
    name: "private-discussion",
    icon: <BsFillReplyFill />,
  },
  {
    name: "badges",
    icon: <HiOutlineIdentification />,
  },
  {
    name: "tag",
    icon: <AiFillAppstore />,
  },
];
export const getTags = () => [
  {
    name: "general",
    icon: <FaCommentDots />,
    color: "#1572A1",
    child: [
      { name: "pengumuman", icon: <HiSpeakerphone /> },
      { name: "peraturan", icon: <FaGavel /> },
    ],
  },
  {
    name: "pengetahuan",
    icon: <TbNotebook />,
    color: "#569CD6",
    child: [],
  },
  {
    name: "support",
    icon: <BiSupport />,
    color: "#569CD6",
    child: [],
  },
  {
    name: "off-topic",
    icon: <FaComments />,
    color: "#789395",
    child: [],
  },
  {
    name: "koleksi-vip",
    icon: <IoDiamond />,
    color: "#87BD6F",
    child: [],
  },
  {
    name: "koleksi-2d",
    icon: <FaPaintBrush />,
    color: "#5DC13B",
    child: [
      { name: "hentai", icon: <FaFeatherAlt /> },
      { name: "komik", icon: <BsFillBookFill /> },
      { name: "wallpaper", icon: <BsCardImage /> },
    ],
  },
  {
    name: "koleksi-asia",
    icon: <FaGlobeAsia />,
    color: "#CBA412",
    child: [
      { name: "china", icon: <TbLetterC /> },
      { name: "indonesia", icon: <TbLetterI /> },
      { name: "jepang", icon: <TbLetterJ /> },
      { name: "korea", icon: <TbLetterK /> },
      { name: "malaysia", icon: <TbLetterM /> },
      { name: "vietnam", icon: <TbLetterV /> },
    ],
  },
  {
    name: "koleksi-barat",
    icon: <BiWorld />,
    color: "#FF8C32",
    child: [],
  },
  {
    name: "koleksi-mantap",
    icon: <BsGenderAmbiguous />,
    color: "#FC4E4E",
    child: [
      { name: "cosplay", icon: <FaMask /> },
      { name: "deepfake", icon: <FaTheaterMasks /> },
      { name: "gravure", icon: <IoHeartCircleSharp /> },
      { name: "onlyfans", icon: <TbPropeller /> },
    ],
  },
  {
    name: "koleksi-sexy",
    icon: <BsGenderFemale />,
    color: "#AA55E1",
    child: [
      { name: "instagram", icon: <BsInstagram /> },
      { name: "live-streaming", icon: <TbLivePhoto /> },
      { name: "tiktok", icon: <IoLogoTiktok /> },
      { name: "trakteer", icon: <AiFillStar /> },
      { name: "twitter", icon: <AiOutlineTwitter /> },
    ],
  },
  {
    name: "marketplace",
    icon: <BiWorld />,
    color: "#FF8C32",
    child: [
      { name: "wtb", icon: <AiOutlineShoppingCart /> },
      { name: "wts", icon: <IoTicketSharp /> },
      { name: "wta", icon: <AiOutlineQuestionCircle /> },
    ],
  },
  {
    name: "promosi",
    icon: <BiShare />,
    color: "#BC8F8F",
    child: [
      { name: "discord", icon: <BsDiscord /> },
      { name: "social-media", icon: <TbSocial /> },
      { name: "telegram", icon: <BsTelegram /> },
      { name: "website", icon: <TbWorld /> },
    ],
  },
  {
    name: "request",
    icon: <FaHandshake />,
    color: "#456ACF",
    child: [],
  },
  {
    name: "test-posting",
    icon: <BiTestTube />,
    color: "#B59E8C",
    child: [],
  },
  {
    name: "archive",
    icon: <BsFillArchiveFill />,
    color: "#4E4E4E",
    child: [],
  },
];
