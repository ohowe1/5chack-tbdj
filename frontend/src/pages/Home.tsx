import DefaultLayout from "../components/DefaultLayout";
import PostsTable from "../components/posts/PostsTable";

function Home() {

  return (
    <DefaultLayout>
      <div className="home">
        <h1>Welcome to the Home Page!</h1>
        <p>This is the main page of our application.</p>
        <PostsTable />
      </div>
    </DefaultLayout>
  );
}

export default Home;
