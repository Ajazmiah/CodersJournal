import {
  FaEdit,
  FaUserCircle,
  FaHome,
  FaCog,
  FaPencilAlt,
  FaComment,
  FaHeart,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaGithub,
  FaTrash, 
  FaCaretDown
} from "react-icons/fa";

export const icons = {
  EditAccount: <FaEdit />,
  Profile: <FaUserCircle />,
  Home: <FaHome />,
  Setting: <FaCog />,
  Create: <FaPencilAlt />,
  Comment: <FaComment />,
  Heart: <FaHeart />,
  Fb: <FaFacebook />,
  github: <FaGithub/>,
  youtube: <FaYoutube/>,
  twitter: <FaTwitter />,
  delete: <FaTrash/>,
  update: <FaEdit/>,
  arrowDown: <FaCaretDown/>

};

export const getIcon = (iconName) => {
  return icons[iconName];
};
