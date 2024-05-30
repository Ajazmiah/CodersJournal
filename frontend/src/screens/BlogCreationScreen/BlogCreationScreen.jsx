import React, { useState } from "react";
import Styles from "./BlogCreationScreen.module.css";
import classnames from "classnames";
import { useSubmitPostMutation } from "../../slices/postsApiSlice";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import QuillRichText from "../../components/RichText/RichText";
import { Paper, Grid, Button, TextField } from "@mui/material";

function BlogCreationScreen() {


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
    catch (err) {
      toast.error(err)
    }

    setTitle('')
    setSummary('')
    setQuillValue('')

  };

  return (
    
  
<div className= {classnames("container pageContainer")}>
  <div>
    <label for="title">Title</label>
    <input
      required
      id="title"
      name="title"
      type="text"
      value={title}
      onchange={()=> setTitle(this.value)}
    />
  </div>

  <div>
    <label for="summary">Summary</label>
    <input
      required
      id="summary"
      name="summary"
      type="text"
      value={summary}
      onchange={() => setSummary(this.value)}
      autocomplete="shipping address-line1"
    />
  </div>
  <QuillRichText setQuillValue={setQuillValue} QuillValue={QuillValue} />
  <Button variant="contained" sx={{ marginTop: '50px' }} onClick={postSubmitHandler}>
        Post
      </Button>

</div>


     
      

  );
}

export default BlogCreationScreen;
