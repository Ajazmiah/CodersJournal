import { FaEdit } from "react-icons/fa";
import { FaUserCircle } from 'react-icons/fa';


export const icons = {
    EditAccount: <FaEdit/>,
    Profile: <FaUserCircle/>
}

export const getIcon = (iconName) => {
    console.log("HI ICON")
    return icons[iconName]
}