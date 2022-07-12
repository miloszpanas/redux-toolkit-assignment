import "antd/dist/antd.css";
import "./App.css";
import { RenderRoutes } from "../../routing";
import { Header } from "../../common";

function App() {
  return (
    <>
      <Header />
      <RenderRoutes />
    </>
  );
}

export default App;
