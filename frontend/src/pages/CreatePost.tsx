import DefaultLayout from "../components/DefaultLayout";
import PostForm from "../components/posts/PostForm"


function CreatePost() {

  return (
    <DefaultLayout>
      <PostForm post={null}/>
    </DefaultLayout>
  );
}

export default CreatePost;