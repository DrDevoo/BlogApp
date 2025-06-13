import axios from "axios";
import { useState } from "react";

function LoginForm() {
  const [msg, setMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email-address"),
      password: formData.get("password"),
    };

    axios
      .post("http://localhost:5077/api/Account/login", data)
      .then((response) => {
        console.log("Sikeres bejelentkezés:", response.data);
        if(response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          setMsg("Sikeres bejelentkezés! Üdvözöljük a rendszerben.");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.error("Hiba a bejelentkezés során:", error.response.data);
          setMsg("Hiba történt a bejelentkezés során. Kérjük, ellenőrizze az adatokat és próbálja újra.");
        } else {
          console.error("Hiba a bejelentkezés során:", error);
          setMsg("Hiba történt a bejelentkezés során. Kérjük, próbálja újra később.");
        }
      });
  }
  return (
    <main className="pa4 black-80">
      <form className="measure center" onSubmit={handleSubmit}>
        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
          <legend className="f4 fw6 ph0 mh0">Bejelentkezés</legend>
          {msg && <div className="bg-light-red pa3 mb3">{msg}</div>}
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
          <label className="pa0 ma0 lh-copy f6 pointer">
            <input type="checkbox" /> Emlékezz rám
          </label>
        </fieldset>
        <div>
          <input
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
            type="submit"
            value="Belépek"
          />
        </div>
      </form>
    </main>
  );
}

export default LoginForm;
