import React from "react";
import Styles from "./styles.module.css"

export const TextInput = ({register, error, label, id, ...rest }) => {
  return <>
    <div className={Styles.FormItem}>
      <div className={Styles.FormItemGroup}>
        <label htmlFor={id}>{label}</label>
        <input
          ref={register}
          id={id}
          aria-invalid={error ? "true" : "false"}
          {...rest}
         />
         {error && <div className={Styles.Error}>{error.message}</div>}
      </div>
      
    </div>
  </>
}