import React from "react";
import { useForm } from "react-hook-form";
import Styles from "./styles.module.css"

export default function TextBox(props) {
  const { register } = useForm();
  const { onChange, id, name, label, placeholder } = props;

  const handleChange = (e) => {
    if(typeof onChange === 'function') {
      onChange(e.target.value);
    }
  }

  return (
    <div className={Styles.FormItem}>
      <div className={Styles.FormItemGroup}>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={name}
          type="text"
          ref={register}
          placeholder={placeholder ? placeholder : ''}
          onChange={handleChange} />
      </div>
    </div>
  )
}