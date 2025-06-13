import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  }

  return (
    <>
      <header className="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav className="f6 fw6 ttu tracked">
          <Link className="link dim white dib mr3" to="/" title="Home">
            Főoldal
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                className="link dim white dib mr3"
                to="/felhasznalo/vezerlopult"
              >
                Fiókom
              </Link>
              <Link
                className="link dim white dib mr3"
                to=""
                onClick={handleLogout}
              >
                Kijelentkezés
              </Link>
            </>
          ) : (
            <>
              <Link
                className="link dim white dib mr3"
                to="/felhasznalo/regisztracio"
              >
                Regisztráció
              </Link>
              <Link
                className="link dim white dib mr3"
                to="/felhasznalo/bejelentkezes"
              >
                Bejelntkezés
              </Link>{" "}
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;
