import { Route,Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Users/Login";
import Register from "./Pages/Users/Register";
import BlogDetails from "./Pages/BlogDetails";
import ControlPanel from "./Pages/Users/ControlPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/felhasznalo/bejelentkezes" element={<Login />} />
      <Route path="/felhasznalo/regisztracio" element={<Register />} />
      <Route path="/felhasznalo/vezerlopult" element={<ControlPanel />} />
      <Route path="/blog/:blogId" element={<BlogDetails />} />
    </Routes>
  );
}

export default App
