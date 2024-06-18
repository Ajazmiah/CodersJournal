import {
  FaEdit,
  FaUserCircle,
  FaHome,
  FaCog,
  FaPencilAlt,
} from "react-icons/fa";

export const icons = {
  EditAccount: <FaEdit />,
  Profile: <FaUserCircle />,
  Home: <FaHome />,
  Setting: <FaCog />,
  Create: <FaPencilAlt />,
};

export const getIcon = (iconName) => {
  return icons[iconName];
};
