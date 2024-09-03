// import { Link, useNavigate } from "react-router-dom";

// import Button from "@mui/material/Button";
// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLoginMutation } from "../../slices/usersApiSlice";
// import { setCredentials } from "../../slices/authSlice";
// import Typography from "@mui/material/Typography";
// import Avatar from "@mui/material/Avatar";
// import Checkbox from "@mui/material/Checkbox";
// import Grid from "@mui/material/Grid";

// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";

// import Box from "@mui/material/Box";

// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await login({ email, password }).unwrap();
    
//       dispatch(setCredentials({ ...res }));
//       navigate("/");
//     } catch (err) {
//       alert("WRONG CREDENTIAL");
//     }
//   };

//   const defaultTheme = createTheme();

//   const [login, { isLoading }] = useLoginMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (userInfo) {
//       navigate("/");
//     }
//   }, [navigate, userInfo]);

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Container component="main" maxWidth="xs">
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>AM</Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <Box
//             component="form"
//             onSubmit={submitHandler}
//             noValidate
//             sx={{ mt: 1 }}
//           >
//             <TextField
//               margin="normal"
//               required
//               onChange={(e) => setEmail(e.target.value)}
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               value={email}
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               value={password}
//               name="password"
//               label="Enter password"
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//             {/* <Grid container>
//               <Grid item>
//                 <Link to="/signup">{"Don't have an account ? Sign Up"}</Link>
//               </Grid>
//             </Grid> */}
//           </Box>
//         </Box>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default LoginForm;
