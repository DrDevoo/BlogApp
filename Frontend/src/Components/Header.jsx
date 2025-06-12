import { Link } from "react-router-dom";
function Header() {
  return (
    <>
      <header class="bg-black-90 w-100 ph3 pv3 pv4-ns ph4-m ph5-l">
        <nav class="f6 fw6 ttu tracked">
          <Link class="link dim white dib mr3" to="/" title="Home">
            Főoldal
          </Link>
          <Link
            class="link dim white dib mr3"
            to="/felhasznalo/regisztracio"
            title="About"
          >
            Regisztráció
          </Link>
          <Link
            class="link dim white dib mr3"
            to="/felhasznalo/bejelentkezes"
            title="Store"
          >
            Bejelntkezés
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
