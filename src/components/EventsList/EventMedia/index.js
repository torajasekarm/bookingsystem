import React from "react";
import Styles from "./styles.module.css";

export default function EventMedia(props) {
    const {imgURL, altText } = props;
  return(
    <div className={Styles.EventMedia} >
      <img className={Styles.EventMediaImage} src={imgURL} alt={altText} />
    </div>
  )
}