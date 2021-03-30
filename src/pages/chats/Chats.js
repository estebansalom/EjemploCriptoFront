import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { SessionContext } from "../../helpers/SessionContext";
import { PKeyContext } from "../../helpers/KeyContext";
import { Link } from "react-router-dom";

export default function Chats() {
  const [newChat, setNewChat] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [chats, setChats] = useState([]);
  const { session, setSession } = useContext(SessionContext);

  useEffect(() => {
    if (loaded !== 1) {
      if (session !== null && session !== "" && session !== undefined) {
        axios
          .get(`http://localhost:8081/api/v1/chats/`, {
            headers: { Authorization: "Bearer " + session },
          })
          .then((res) => {
            setChats(res.data);
            setLoaded(1);
          });
      }
    }
    if (newChat === 1) {
      axios
        .get(`http://localhost:8081/api/v1/message/newChat/2`, {
          headers: { Authorization: "Bearer " + session },
        })
        .then((res) => {
          setNewChat(0);
          setChats(res.data);
        });
    }
  }, [newChat, loaded]);
  return (
    <div>
      <button
        className="chats__new-chat-button--base"
        onClick={(e) => {
          e.preventDefault();
          setNewChat(1);
        }}
      >
        Crear Nuevo Chat
      </button>
      <div className="chats__chat-container--base">
        {chats !== [] ? (
          chats.map((c, i) => {
            return (
              <div key={i} className="chats__chat-info--base">
                <Link className="chats__chat-link--base" to={"/chat/" + c.id}>
                  <div className="chats__chat-info--base">{c.name}</div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="chats__no-chat-found--base"></div>
        )}
      </div>
    </div>
  );
}
