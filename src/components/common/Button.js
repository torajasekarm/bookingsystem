import React from "react";
import Styles from "./button.module.css";

export default function Button({type, value,  ...rest }){
  return <>
    <button type={type} {...rest} className={Styles.Btn}>
      {value}
    </button>
  </>
}