import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import { store } from "./store/store";
import { fetchPosts } from "./reducers/Posts/postServices";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

store.dispatch(fetchPosts());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
