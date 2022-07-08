import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddPost, EditPost, PostList, SinglePost } from "../components/Posts";

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
    component: <SinglePost />,
  },
  {
    path: "/post/:id/edit",
    key: "editPost",
    component: <EditPost />,
  },
];

export const RenderRoutes = () => {
  return (
    <Router>
      <Routes>
        {ROUTES.map(({ key, path, component }) => (
          <Route key={key} path={path} element={component} />
        ))}
      </Routes>
    </Router>
  );
};
