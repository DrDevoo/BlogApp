import { Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Users/Login";
import Register from "./Pages/Users/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/felhasznalo/bejelentkezes" element={<Login />} />
      <Route path="/felhasznalo/regisztracio" element={<Register />} />
    </Routes>
  );
}

export default App
