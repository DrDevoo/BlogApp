import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogEditUser from "./BlogEditUser";


function BlogListUser() {
  const [blogs, setBlogs] = useState([]);
  const [editPostBoxOpened, setEditPostBoxOpened] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get("http://localhost:5077/api/Posts/author/" + username)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Hiba a lekérés során: ", error);
      });
  }, []);

  function deleteBlog(id) {
    if (!window.confirm("Biztosan törölni szeretnéd ezt a posztot?")) {
      return;
    }

    const token = localStorage.getItem("token");

    axios
      .delete(`http://localhost:5077/api/Posts/author/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      })
      .catch((error) => {
        console.error("Hiba a törlés során: ", error);
        alert("Hiba történt a poszt törlése során. Kérjük, próbáld újra.");
      });
  };

  return (
    <div className="blog-list-user">
      {blogs.map((blog) => (
        <div key={blog.id} className="element">
          <article className="center mw5 mw6-ns hidden ba mv4 full-width">
            <div className="flex justify-between items-center bg-near-black">
              <h1 className="f4 bg-near-black white mv0 pv2 ph3">
                {blog.title}
              </h1>
              <div className="bg-near-black flex">
                <span className="white pr3">
                  {blog.dateCreated && !isNaN(new Date(blog.dateCreated))
                    ? new Date(blog.dateCreated).toLocaleDateString()
                    : "Betöltés..."}
                </span>
              </div>
            </div>
            <div className="pa3 bt">
              <p className="f6 f5-ns lh-copy measure mv0 full-width">
                {blog.content}
              </p>
            </div>
          </article>
          <div className="flex">
            <button
              onClick={() => deleteBlog(blog.id)}
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-red border mr2"
            >
              Törlés
            </button>
            <button
              onClick={() => {
                setSelectedPostId(blog.id);
                setEditPostBoxOpened(true);
              }}
              className="f6 link dim br3 ph3 pv2 mb2 dib white bg-green border"
            >
              Szerkesztes
            </button>
          </div>
        </div>
      ))}
      {editPostBoxOpened ? (
        <BlogEditUser
          onCancel={() => setEditPostBoxOpened(false)}
          postId={selectedPostId}
        />
      ) : null}
    </div>
  );
}

export default BlogListUser;
