import React from "react";

export default function Input({ name, id, type, placeholder, onChangeF }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={onChangeF}
    />
  );
}
