import React, {useState} from 'react'
import { useEditPostMutation } from '../../slices/postsApiSlice';
import QuillRichText from '../RichText/RichText';

function BlogEdit({ editTitle, editSummary, quillValue, id , ...rest}) {

  const [edit, setEdit] = useState(false)

  
    const postSubmitHandler = async (title, summary, QuillValue) => {

        console.log("NEW", newTitle)
      try {
        let data = {
          title,
          summary,
          body: QuillValue,
          id,
        };
        const res = await useEditPostMutation(data).unwrap();
        console.log("RESS", res)
        setEdit(true)
      } catch (err) {
       // toast.error(err);
      }
    };

  
    return (
      <QuillRichText
        postSubmitHandler={postSubmitHandler}
        editTitle={editTitle}
        editSummary={editSummary}
        editQuillValue={quillValue}
        {...rest}
      />
    );
  }

export default BlogEdit