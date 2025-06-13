import { use, useEffect } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function BlogDetails() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5077/api/Posts/" + blogId)
      .then((response) => {
        setBlog(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Hiba a lekérés során: ", error);
      });
  }, []);

  return (
    <>
      <Header />
      <section className="tc ph4">
        <h1 className="f3 f2-m f1-l fw2 black-90 mv3">{blog.title}</h1>
        <h2 className="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
          {blog.author} •
          {blog.dateCreated && !isNaN(new Date(blog.dateCreated))
            ? new Date(blog.dateCreated).toLocaleDateString()
            : "Betöltés..."}
        </h2>
      </section>
      <section className="pa3 pa5-ns">
        <p className="f4">{blog.content}</p>
      </section>
    </>
  );
}

export default BlogDetails;
