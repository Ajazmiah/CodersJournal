import {
  FaEdit,
  FaUserCircle,
  FaHome,
  FaCog,
  FaPencilAlt,
  FaComment, 
  FaHeart
} from "react-icons/fa";

export const icons = {
  EditAccount: <FaEdit />,
  Profile: <FaUserCircle />,
  Home: <FaHome />,
  Setting: <FaCog />,
  Create: <FaPencilAlt />,
  Comment: <FaComment/>,
  Heart: <FaHeart/>
};

export const getIcon = (iconName) => {
  return icons[iconName];
};
