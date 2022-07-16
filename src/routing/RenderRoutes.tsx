import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MutatePost, PostList, ViewedPost } from "../components/Posts";
import { Result } from "antd";

const ROUTES = [
  {
    path: "/",
    key: "home",
    component: <PostList />,
  },
  {
    path: "/post",
    key: "addPost",
    component: <MutatePost />,
  },
  {
    path: "/post/:id",
    key: "singlePost",
    component: <ViewedPost />,
  },
  {
    path: "/post/:id/edit",
    key: "editPost",
    component: <MutatePost />,
  },
  {
    path: "/*",
    key: "notFound",
    component: (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
      />
    ),
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
