import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5077/api/Posts")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Hiba a lekérés során: ", error);
      });
  }, []);

  function truncateText(text, maxLength) {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  }

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <Link
          to={`/blog/${blog.id}`}
          className="no-underline black"
          key={blog.id}
        >
          <article className="center mw5 mw6-ns hidden ba mv4 holographic-card">
            <div className="flex justify-between items-center bg-near-black">
              <h1 className="f4 bg-near-black white mv0 pv2 ph3">
                {blog.title}
              </h1>
              <div className="bg-near-black flex">
                <span className="white pr1">{blog.author} •</span>
                <span className="white pr3">
                  {blog.dateCreated && !isNaN(new Date(blog.dateCreated))
                    ? new Date(blog.dateCreated).toLocaleDateString()
                    : "Betöltés..."}
                </span>
              </div>
            </div>

            <div className="pa3 bt">
              <p className="f6 f5-ns lh-copy measure mv0">
                {truncateText(blog.content, 100)}
              </p>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

export default BlogList;
