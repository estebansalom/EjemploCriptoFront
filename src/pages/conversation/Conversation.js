import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ChatInput from "../../components/chat-input/ChatInput";
import { useParams } from "react-router-dom";
import { SessionContext } from "../../helpers/SessionContext";
import { PKeyContext } from "../../helpers/KeyContext";
import { encryptFun, decryptFun } from "../../helpers/Crypto";

export default function Conversation({}) {
  let { chatId } = useParams();
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const { session, setSession } = useContext(SessionContext);
  const { publicKey, setPublicKey } = useContext(PKeyContext);
  const [chatUrl, setChatUrl] = useState("");

  useEffect(() => {
    if (loaded !== 1) {
      axios
        .get(`http://localhost:8081/api/v1/message/` + chatId, {
          headers: { Authorization: "Bearer " + session },
        })
        .then((res) => {
          console.log(res.data);
          setMessages(res.data);
          setLoaded(1);
          setChatUrl(`http://localhost:8081/api/v1/message/chat/` + chatId);
        });
    }
  }, [loaded]);
  return (
    <div className="conversation__container--base">
      <div className="conversation__message-holder--base">
        {messages !== []
          ? messages.map((m, i) => {
              let text = decryptFun(m.content, publicKey, "1234567812345678");
              return (
                <div key={i} className="message__container--base">
                  {text}
                </div>
              );
            })
          : ""}
      </div>
      <ChatInput
        url={chatUrl}
        onMessageReturn={() => {
          setLoaded(0);
        }}
      ></ChatInput>
    </div>
  );
}
