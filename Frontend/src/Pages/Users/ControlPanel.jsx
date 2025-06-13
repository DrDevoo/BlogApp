import Header from "../../Components/Header";
import { useEffect, useState } from "react";

function ControlPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (!token) {
      window.location.href = "/felhasznalo/bejelentkezes"; // Redirect to login if not logged in
    }
  }, []);

  return (
    <>
      <Header />
      <div className="pa4 black-80">
        <button
          class="f6 link dim br3 ph3 pv2 mb2 dib white bg-near-black"
          href="#0"
        >
          Új poszt feltöltés
        </button>
      </div>
      <section className="pa4 black-80">
        <h2>Posztjaim:</h2>
      </section>
    </>
  );
}

export default ControlPanel;
