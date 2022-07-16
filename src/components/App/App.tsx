import { useEffect } from "react";
import "antd/dist/antd.css";
import "./App.css";
import { RenderRoutes } from "../../routing";
import { Header } from "../../common";
import { fetchPosts } from "../../reducers/Posts/postServices";
import { useAppDispatch } from "../../hooks/reduxHooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <>
      <Header />
      <RenderRoutes />
    </>
  );
}

export default App;
