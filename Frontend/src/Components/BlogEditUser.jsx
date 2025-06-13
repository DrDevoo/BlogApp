import { useState, useEffect } from "react";
import axios from "axios";

function BlogEditUser({ postId, onCancel }) {
  var [blogContent, setBlogContent] = useState("");
  var [blogTitle, setBlogTitle] = useState("");
  var [blogId, setBlogId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5077/api/Posts/" + postId)
      .then((response) => {
        setBlogContent(response.data.content);
        setBlogTitle(response.data.title);
        setBlogId(response.data.id);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Hiba a lekérés során: ", error);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const updatedBlog = {
      id: blogId,
      title: blogTitle,
      content: blogContent,
    };

    const token = localStorage.getItem("token");

    axios
      .put(`http://localhost:5077/api/Posts/${postId}`, updatedBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Sikeresen frissítve:", response.data);
        window.location.reload();
      })
      .catch((error) => {
        console.error("Hiba a frissítés során: ", error);
        alert("Hiba történt a poszt frissítése során. Kérjük, próbáld újra.");
      });
  }

  return (
    <section className="popup-box">
      <div className="box">
        <div>
          <button
            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
            onClick={onCancel}
          >
            MÉGSEM
          </button>
        </div>
        <article className="pa4 black-80">
          <form action="sign-up_submit" method="get" accept-charset="utf-8" onSubmit={handleSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="ph0 mh0 fw6 clip">
                Bejegyzés szerkesztése
              </legend>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" for="title">
                  A bejegyzés címe
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent w-100 measure"
                  type="text"
                  name="title"
                  id="title"
                  onChange={(e) => setBlogTitle(e.target.value)}
                  value={blogTitle}
                />
              </div>
              <div className="mt3">
                <label className="db fw4 lh-copy f6" for="content">
                  A bejegyzés tartalma
                </label>
                <textarea
                  className="b pa2 input-reset ba bg-transparent"
                  name="content"
                  id="content"
                  rows="10"
                  onChange={(e) => setBlogContent(e.target.value)}
                  value={blogContent}
                />
              </div>
            </fieldset>
            <div className="mt3">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6"
                type="submit"
                value="Szerkesztés"
              />
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}

export default BlogEditUser;
