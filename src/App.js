import "./resources/css/main.css";
import { useState, useMemo, useEffect } from "react";
import RegisterUser from "./pages/register-user/RegisterUser";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { PKeyContext } from "./helpers/KeyContext";
import { SessionContext } from "./helpers/SessionContext";
import Conversation from "./pages/conversation/Conversation";
import Chats from "./pages/chats/Chats";
import Landing from "./pages/landing/Landing";
import Header from "./components/header/Header";
import { encryptFun, decryptFun } from "./helpers/Crypto";

function App() {
  const [loaded, setLoaded] = useState(0);
  const [publicKey, setPublicKey] = useState(sessionStorage.getItem("pk"));
  const [session, setSession] = useState(sessionStorage.getItem("jwt"));
  const jwt = useMemo(() => ({ session, setSession }), [session, setSession]);
  const pk = useMemo(() => ({ publicKey, setPublicKey }), [
    publicKey,
    setPublicKey,
  ]);

  useEffect(() => {
    if (loaded === 0) {
      let key = sessionStorage.getItem("pk");
      let token = sessionStorage.getItem("jwt");
      if (key === null || key === undefined || key === "") {
        setPublicKey("");
      } else {
        setPublicKey(key);
      }

      if (token === null || token === undefined || token === "") {
        setSession("");
      } else {
        setSession(token);
      }
      setLoaded(1);
    } else {
      let encHola = encryptFun("hello world", publicKey, "1234567812345678");
      console.log(encHola);
      let decHola = decryptFun(encHola, publicKey, "1234567812345678");
      console.log(decHola);
    }
  }, [loaded]);
  return (
    <Router>
      <PKeyContext.Provider value={pk}>
        <SessionContext.Provider value={jwt}>
          <Header></Header>
          {session === "" || session === undefined || session === null ? (
            <div className="App">
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={RegisterUser} />
              <Route path="/login" component={Login} />
              <Route path="/chat" component={Conversation} />
            </div>
          ) : (
            <div className="App">
              <Route exact path="/" component={Chats} />
              <Route path="/login" component={Login} />
              <Route path="/chat/:chatId" component={Conversation} />
            </div>
          )}
        </SessionContext.Provider>
      </PKeyContext.Provider>
    </Router>
  );
}

export default App;
