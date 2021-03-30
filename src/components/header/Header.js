import React, { useContext } from "react";
import { SessionContext } from "../../helpers/SessionContext";
import { PKeyContext } from "../../helpers/KeyContext";
import { Link } from "react-router-dom";
export default function Header() {
  const { session, setSession } = useContext(SessionContext);
  const { publicKey, setPublicKey } = useContext(PKeyContext);
  return (
    <div className={"header__container--base"}>
      <Link to="/" className="header__logo--base"></Link>
      {session === "" || session === undefined || session === null ? (
        <div className={"header__button-group--base"}>
          <Link to="/login" className="header__button--base">
            Iniciar Sesión
          </Link>
          <Link to="/register" className="header__button--base">
            Regístrese
          </Link>
        </div>
      ) : (
        <div className={"header__button-group header__button-group--logged"}>
          <Link
            to="/"
            className="header__button--base"
            onClick={() => {
              setSession("");
              setPublicKey("");
              sessionStorage.setItem("jwt", "");
              sessionStorage.setItem("pk", "");
            }}
          >
            Cerrar Sesión
          </Link>
        </div>
      )}
    </div>
  );
}
