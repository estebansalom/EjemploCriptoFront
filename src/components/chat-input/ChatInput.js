import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { encryptFun, decryptFun } from "../../helpers/Crypto";
import { PKeyContext } from "../../helpers/KeyContext";
import { SessionContext } from "../../helpers/SessionContext";

export default function ChatInput({ url, onMessageReturn }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(0);
  const { session, setSession } = useContext(SessionContext);
  const { publicKey, setPublicKey } = useContext(PKeyContext);
  useEffect(() => {
    if (sent === 1) {
      let cinput = document.getElementById("chat-input");
      cinput.value = "";
      let encryptedText = "";
      encryptedText = encryptFun(text, publicKey, "1234567812345678");
      console.log(encryptedText);
      let message = { type: "text", content: encryptedText };
      axios
        .post(url, message, {
          headers: { Authorization: "Bearer " + session },
        })
        .then((res) => {
          console.log(res.data);
          setSent(0);
          setText("");
          onMessageReturn();
        });
    }
  }, [sent]);
  return (
    <div className="chat-input__container--base">
      <input
        id="chat-input"
        type="text"
        className="chat-input__input--base"
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button
        className="chat-input__button--base"
        type="submmit"
        onClick={(e) => {
          e.preventDefault();
          setSent(1);
        }}
      >
        Send
      </button>
    </div>
  );
}
