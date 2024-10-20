//import { Counter } from "./features/counter/Counter";
import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";
import { Layout } from "./components/Layout";
import { Routes, Route } from "react-router-dom"

function App() {
  return (
  <Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={<PostsList />} />

      <Route path="post" element={<AddPostForm />} />

      <Route path="post/:postId" element={<SinglePostPage />} />

      <Route path="post/edit/:postId" element={<EditPostForm/>}/>
      
    </Route>
  </Routes>
  );
}

export default App;
