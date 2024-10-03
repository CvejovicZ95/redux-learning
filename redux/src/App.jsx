import { Counter } from "./features/counter/Counter";
import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";

function App() {
  return (
    <div className="App">
      <h1>Redux</h1>
      <h2>01:Redux-basics</h2>
      <Counter/>
      <h2>02:Redux-basics-Posts List</h2>
      <AddPostForm/>
      <PostsList/>
    </div>
  );
}

export default App;
