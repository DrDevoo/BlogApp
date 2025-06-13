import axios from "axios";
import React, { useState } from "react";

function RegisterForm() {
  const [msg, setMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    if(formData.get("password") !== formData.get("repassword")) {
      setMsg("A jelszavak nem egyeznek meg. Kérjük, ellenőrizze őket.");
      return;
    }

    const data = {
      userName: formData.get("username"),
      email: formData.get("email-address"),
      password: formData.get("password"),
    };

    axios
      .post("http://localhost:5077/api/Account/register", data)
      .then((response) => {
        console.log("Sikeres regisztráció:", response.data);
        setMsg("Sikeres regisztráció! Kérjük, jelentkezzen be.");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errors = error.response.data;
          if (
            errors.PasswordTooShort ||
            errors.PasswordRequiresDigit ||
            errors.PasswordRequiresUpper ||
            errors.PasswordRequiresNonAlphanumeric
          ) {
            let messages = [];

            if (errors.PasswordTooShort) {
              messages.push(
                "A jelszónak legalább 6 karakter hosszúnak kell lennie."
              );
            }
            if (errors.PasswordRequiresDigit) {
              messages.push(
                "A jelszónak legalább egy számjegyet kell tartalmaznia."
              );
            }
            if (errors.PasswordRequiresUpper) {
              messages.push(
                "A jelszónak legalább egy nagybetűt kell tartalmaznia."
              );
            }
            if (errors.PasswordRequiresNonAlphanumeric) {
              messages.push(
                "A jelszónak legalább egy speciális karaktert kell tartalmaznia (pl. !, @, #)."
              );
            }

            setMsg(messages.join(" "));
          } else {
            setMsg(
              "Hiba történt a regisztráció során. Kérjük, ellenőrizze az adatokat és próbálja újra."
            );
          }
        } else {
          console.error("Hiba a regisztráció során:", error);
          setMsg(
            "Hiba történt a regisztráció során. Kérjük, ellenőrizze az adatokat és próbálja újra."
          );
        }
      });
      
  }

  return (
    <main className="pa4 black-80">
      <form className="measure center" onSubmit={handleSubmit}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Regisztráció</legend>
          {msg && <div className="mb3">{msg}</div>}
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="username">
              Felhaszálónév
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="text"
              name="username"
              id="username"
            />
          </div>
          <div className="mt3">
            <label className="db fw6 lh-copy f6" htmlFor="email-address">
              Email cím
            </label>
            <input
              className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="email"
              name="email-address"
              id="email-address"
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Jelszó
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="password"
              id="password"
            />
          </div>
          <div className="mv3">
            <label className="db fw6 lh-copy f6" htmlFor="password">
              Jelszó ismét
            </label>
            <input
              className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
              type="password"
              name="repassword"
              id="password"
            />
          </div>
        </fieldset>
        <div>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Regisztrálok"
          />
        </div>
      </form>
    </main>
  );
}

export default RegisterForm;
