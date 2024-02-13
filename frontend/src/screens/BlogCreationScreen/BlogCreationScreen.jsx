import React, { useState } from "react";
import Styles from "./BlogCreationScreen.module.css";
import classNames from "classnames";
import { useSubmitPostMutation } from "../../slices/postsApiSlice";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import QuillRichText from "../../components/RichText/RichText";
import { Paper , Grid, Button, TextField} from "@mui/material";

function BlogCreationScreen() {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [QuillValue, setQuillValue] = React.useState("");

  const [submitPost] = useSubmitPostMutation();


  const postSubmitHandler = async () => {


   try {
    let data = {
      title,
      summary,
      body: QuillValue,
    };
    const res = await submitPost(data).unwrap();
   }
   catch(err) {
      toast.error(err)
   }

    setTitle('')
    setSummary('')
    setQuillValue('')

  };

  return (
    <Paper className={classNames('container' ,Styles.richText)} elevation={4}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="title"
            name="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="standard"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="summary"
            name="summary"
            label="Summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
          />
        </Grid>
      </Grid>

      <QuillRichText setQuillValue={setQuillValue} QuillValue={QuillValue}/>

      <Button variant="contained"  sx={{marginTop: '50px'}} onClick={postSubmitHandler}>
        Post
      </Button>
    </Paper>
  );
}

export default BlogCreationScreen;
