import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Input from "../../components/input/Input";
import Form from "../../components/form/Form";
import { SessionContext } from "../../helpers/SessionContext";
import { PKeyContext } from "../../helpers/KeyContext";
import md5 from "md5";

export default function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(0);
  const { session, setSession } = useContext(SessionContext);
  const { publicKey, setPublicKey } = useContext(PKeyContext);

  useEffect(() => {
    if (submitted === 1) {
      let creds = {
        email: email,
        password: md5(password),
      };
      axios
        .post("http://localhost:8081/api/v1/user/login", creds)
        .then((res) => {
          console.log(res.data);
          setSession(res.data.jwt);
          setPublicKey(res.data.pk);
          sessionStorage.setItem("jwt", res.data.jwt);
          sessionStorage.setItem("pk", res.data.pk);
          setSubmitted(0);
          history.push("/");
        });
    }
  }, [submitted]);

  return (
    <div className="login__container--base">
      <Form
        name="login"
        title="Inicio de Sesión"
        buttonText="Iniciar Sesión"
        onSubmitF={(e) => {
          e.preventDefault();
          setSubmitted(1);
        }}
      >
        <Input
          type="email"
          name="email"
          placeholder="Ingrese su correo electrónico..."
          id="user-email"
          onChangeF={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          type="password"
          name="password"
          placeholder="Ingrese su contraseña..."
          id="user-password"
          onChangeF={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form>
    </div>
  );
}
