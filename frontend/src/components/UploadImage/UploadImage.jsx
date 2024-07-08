// import { Button, Paper, Typography } from "@mui/material";
// import React, { useState } from "react";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import { useSelector } from "react-redux";
// import ProfileImage from "../ProfileImage/ProfileImage";
// import Styles from "./UploadImage.module.css";
// function useUploadImage() {
//   const { userInfo } = useSelector((state) => state.auth);

//   const [profilePicture, setProfilePicture] = useState({ myFile: null });
//   const [image, setImage] = useState("");

//   function convertToBase64(file) {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);
//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };
//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   }

//   const handleProfilePic = async (e) => {
//     const file = e.target.files[0];

//     const base64Img = await convertToBase64(file);
//     setImage(base64Img);

//     setProfilePicture((prev) => ({ myFile: base64Img }));
//   };

//   const UploadImageInput = (
//     <Paper sx={{ padding: "15px", textAlign: "center" }}>
//       <Typography variant="h6">Change Profile Picture</Typography>

//       <label htmlFor="upload" className={Styles.label}>
//         Select from you computer
//         <CloudUploadIcon
//           fontSize="large"
//           sx={{
//             width: "100px",
//             background: "primary",
//             borderRadius: "20px",
//             height: "50px",
//           }}
//         />
//         <ProfileImage
//           imageURL={image || userInfo?.profilePicture}
//           customClasses="profileImage"
//         />
//       </label>
//       <input
//         type="file"
//         id="upload"
//         className={Styles.input}
//         accept="image/*"
//         onChange={handleProfilePic}
//       />
//     </Paper>
//   );

//   return [profilePicture, UploadImageInput, image, setImage];
// }

// export default useUploadImage;
