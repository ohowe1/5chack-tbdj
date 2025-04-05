import DefaultLayout from "../components/DefaultLayout";

function Home() {
  return (
    <DefaultLayout>
      <div className="home">
        <h1>Welcome to the Home Page!</h1>
        <p>This is the main page of our application.</p>
      </div>
    </DefaultLayout>
  );
}

export default Home;
