import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddPost, EditPost, PostList, ViewedPost } from "../components/Posts";

const ROUTES = [
  {
    path: "/",
    key: "home",
    component: <PostList />,
  },
  {
    path: "/post",
    key: "addPost",
    component: <AddPost />,
  },
  {
    path: "/post/:id",
    key: "singlePost",
    component: <ViewedPost />,
  },
  {
    path: "/post/:id/edit",
    key: "editPost",
    component: <EditPost />,
  },
];

export const RenderRoutes = () => {
  return (
    <div className="app-container">
      <Routes>
        {ROUTES.map(({ key, path, component }) => (
          <Route key={key} path={path} element={component} />
        ))}
      </Routes>
    </div>
  );
};
