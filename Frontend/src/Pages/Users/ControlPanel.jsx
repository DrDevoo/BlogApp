import Header from "../../Components/Header";
import { useEffect, useState } from "react";
import NewPostBox from "../../Components/NewPostBox";
import BlogListUser from "../../Components/BlogListUser";

function ControlPanel() {
  const [newPostBoxOpened, setNewPostBoxOpened] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/felhasznalo/bejelentkezes";
    }
  }, []);

  return (
    <>
      <Header />
      <div className="pa4 black-80">
        <button
          className="f6 link dim br3 ph3 pv2 mb2 dib white bg-near-black border"
          onClick={() => setNewPostBoxOpened(!newPostBoxOpened)}
        >
          Új poszt feltöltés
        </button>
      </div>
      <section className="pa4 black-80">
        <h2>Posztjaim:</h2>
        <BlogListUser />
      </section>
      {newPostBoxOpened ? (
        <NewPostBox onCancel={() => setNewPostBoxOpened(false)} />
      ) : null}
    </>
  );
}

export default ControlPanel;
