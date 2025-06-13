import Header from "../Components/Header";
import BlogList from "../Components/BlogList";
function Home() {
  return (
    <>
        <Header />
        <h1 className="titletext">Blog</h1>
        <BlogList />
    </>
  );
}

export default Home;
