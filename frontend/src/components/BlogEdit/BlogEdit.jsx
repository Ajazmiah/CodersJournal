import React from 'react'
import { useEditPostMutation } from '../../slices/postsApiSlice';
import QuillRichText from '../RichText/RichText';

function BlogEdit({ editTitle, editSummary, quillValue, id , ...rest}) {

  
    const postSubmitHandler = async (newTitle, newSummary, QuillValue) => {

        console.log("NEW", newTitle)
      try {
        let data = {
          title: newTitle,
          summary: newSummary,
          body: QuillValue,
          id,
        };
        const res = await useEditPostMutation(data).unwrap();
      } catch (err) {
        toast.error(err);
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