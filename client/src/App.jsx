import { PostsList } from "./features/posts/PostsList";
import { AddPostForm } from "./features/posts/AddPostForm";
import { SinglePostPage } from "./features/posts/SinglePostPage";
import { EditPostForm } from "./features/posts/EditPostForm";
import { UsersList } from "./features/users/UsersList";
import { UserPage } from "./features/users/UserPage";
import { Layout } from "./components/Layout";
import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  return (
  <Routes>
    <Route path="/" element={<Layout />}>

      <Route index element={<PostsList />} />

      <Route path="post" element={<AddPostForm />} />

      <Route path="post/:postId" element={<SinglePostPage />} />

      <Route path="post/edit/:postId" element={<EditPostForm/>}/>

      <Route path="user" element={<UsersList/>}/>

      <Route path="user/:userId" element={<UserPage/>}/>

      <Route path="*" element={<Navigate to={'/'} replace />} />
      
    </Route>
  </Routes>
  );
}

export default App;
