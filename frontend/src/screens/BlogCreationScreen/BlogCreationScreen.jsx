import React, { useState, useEffect , useRef} from "react";
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


  const titleRef = useRef()


  useEffect(() => titleRef.current.focus() ,[])


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
    
  
<div className= {classnames("container pageContainer", Styles.richText)}>
  <div>
   
    <input
      required
      placeholder="Title.."
      ref={titleRef}
      id="title"
      className={Styles.input}
      name="title"
      type="text"
      value={title}
      onChange={(e)=> setTitle(e.target.value)}
    />
  </div>

  <div>
   
    <input
      required
      className={Styles.input}
      id="summary"
      placeholder="Summary.."
      name="summary"
      type="text"
      value={summary}
      onChange={(e) => setSummary(e.target.value)}
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
