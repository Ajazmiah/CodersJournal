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
  FaCaretDown,
  FaSignInAlt,
  FaUserCheck,
  FaUser,
  FaTimes
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
  arrowDown: <FaCaretDown/>,
  SignIn: <FaSignInAlt/>,
  SignUp: <FaUserCheck/>,
  user: <FaUser/>,
  close: <FaTimes size={35}/>

};

export const getIcon = (iconName) => {
  return icons[iconName];
};
