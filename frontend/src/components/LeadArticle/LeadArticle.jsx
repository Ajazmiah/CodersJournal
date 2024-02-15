import React from "react";
import Typography from "@mui/material/Typography";
import Styles from "./LeadArticle.module.css";
import Image from "../Image/Image";
import classNames from "classnames";
import { useLink } from "../../hooks/useLInk/useLink";



const LeadArticle = ({post}) => {

  const {handleNavigateToPost} = useLink()
 
  return (
    <div onClick={() => handleNavigateToPost(post)}>
        <div
          className={Styles.lead}
        >
          <Image
            // src={post.cover}
            loading="eager"
            className={classNames("imageRound", Styles.leadImage)}
          />
          <div className={Styles.metadataContainer}>
            <Typography>{post.title}</Typography>
            <Typography variant="subtitle2">{post.summary}</Typography>
            <Typography variant="subtitle2">{"January , 2023"}</Typography>
          </div>
        </div>
    
    </div>
  );
};

export default LeadArticle;
