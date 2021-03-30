import React from "react";

export default function Form({ children, onSubmitF, title, buttonText }) {
  return (
    <form className={"form__container--base"} onSubmit={onSubmitF}>
      <div className="form__title--base">{title}</div>
      <div className={"form__input-holder--base"}>{children}</div>
      <button
        type="submit"
        className={"form__button--base"}
        onSubmit={onSubmitF}
      >
        {buttonText}
      </button>
    </form>
  );
}
