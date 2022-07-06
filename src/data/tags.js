import { FaGavel, FaGlobeAsia } from "react-icons/fa";
import { HiSpeakerphone } from "react-icons/hi";
import { TbLetterC, TbLetterI, TbLetterJ, TbNotebook } from "react-icons/tb";

export const getTags = () => [
  {
    name: "General",
    icon: <TbNotebook />,
    color: "#FF0000",
    child: [
      { name: "Pengumuman", icon: <HiSpeakerphone /> },
      { name: "Peraturan", icon: <FaGavel /> },
    ],
  },
  {
    name: "Koleksi Asia",
    icon: <FaGlobeAsia />,
    color: "#222222",
    child: [
      { name: "China", icon: <TbLetterC /> },
      { name: "Indonesia", icon: <TbLetterI /> },
      { name: "Jepang", icon: <TbLetterJ /> },
    ],
  },
];

/*

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
          
*/
