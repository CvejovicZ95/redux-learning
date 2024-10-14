//import { Counter } from "./features/counter/Counter";
import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";

function App() {
  return (
    <div className="App">
      <h1>Redux Posts app</h1>
      <AddPostForm/>
      <PostsList/>
    </div>
  );
}

export default App;
