import { useState, useReducer } from "react";
import { initialFormState, formDataReducer } from "./AddPostReducer";
import { useAppDispatch } from "../../hooks/reduxHooks";

import { addNewPost } from "../../reducers/Posts/postServices";
import { useNavigate } from "react-router-dom";

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [{ title, body, author }, dispatchFormAction] = useReducer(
    formDataReducer,
    initialFormState
  );

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchFormAction({ type: "title", payload: e.target.value });
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatchFormAction({ type: "body", payload: e.target.value });
  const onAuthorChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchFormAction({ type: "author", payload: e.target.value });

  console.log("AUTHOR");

  const canSave =
    [title, body, author].every(Boolean) && addRequestStatus === "idle";

  const savePost = () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        dispatch(addNewPost({ title, body, userId: "1", author }));
        dispatchFormAction({ type: "clear" });
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="title">Post Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={onAuthorChanged}
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          name="content"
          value={body}
          onChange={onContentChanged}
        />
        <button type="button" onClick={savePost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
export default AddPostForm;
