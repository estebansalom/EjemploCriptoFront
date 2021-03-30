import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "../../components/form/Form";
import Input from "../../components/input/Input";
import md5 from "md5";

export default function RegisterUser({ history }) {
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [tel, setTel] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(0);

  useEffect(() => {
    if (submitted === 1) {
      let user = {
        nombre: name,
        apellidos: last,
        telefono: tel,
        email: email,
        password: md5(password),
        identificacion: identificacion,
      };
      axios.post("http://localhost:8081/api/v1/user", user).then((res) => {
        setSubmitted(0);
        setName("");
        setLast("");
        setTel("");
        setIdentificacion("");
        setEmail("");
        setPassword("");
        history.push("/");
      });
    }
  }, [submitted]);

  return (
    <div className="register-user__container--base">
      <Form
        name="register-user"
        title="Registrar Usuario"
        buttonText="Enviar Registro"
        onSubmitF={(e) => {
          e.preventDefault();
          setSubmitted(1);
        }}
      >
        <Input
          type="text"
          name="nombre"
          placeholder="Ingrese su nombre..."
          id="user-name"
          onChangeF={(e) => {
            setName(e.target.value);
          }}
        />
        <Input
          type="text"
          name="apellidos"
          placeholder="Ingrese su apellido..."
          id="user-last"
          onChangeF={(e) => {
            setLast(e.target.value);
          }}
        />
        <Input
          type="text"
          name="identificacion"
          placeholder="Ingrese su identificacion..."
          id="user-ident"
          onChangeF={(e) => {
            setIdentificacion(e.target.value);
          }}
        />
        <Input
          type="tel"
          name="telefono"
          placeholder="Ingrese su número de telófono..."
          id="user-tel"
          onChangeF={(e) => {
            setTel(e.target.value);
          }}
        />
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
