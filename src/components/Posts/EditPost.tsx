import { useState, useReducer } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { formDataReducer } from "./AddPostReducer";
import { updatePost, deletePost } from "../../reducers/Posts/postServices";
import { selectPostsByIdSelector } from "../../reducers/Posts/selectors";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const postToEdit = useAppSelector((state) =>
    selectPostsByIdSelector(state, Number(id))
  );

  const [requestStatus, setRequestStatus] = useState("idle");
  const [{ title, body, author }, dispatchFormAction] = useReducer(
    formDataReducer,
    postToEdit!
  );

  if (!postToEdit) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchFormAction({ type: "title", payload: e.target.value });
  const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatchFormAction({ type: "body", payload: e.target.value });
  const onAuthorChanged = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchFormAction({ type: "author", payload: e.target.value });

  const canSave = [title, body].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = () => {
    if (canSave) {
      try {
        setRequestStatus("pending");

        dispatch(
          updatePost({
            id: postToEdit.id,
            title,
            body,
            userId: postToEdit.userId,
            author,
            thumbsUp: postToEdit.thumbsUp,
          })
        );

        dispatchFormAction({ type: "clear" });
        navigate(`/post/${id}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = () => {
    try {
      setRequestStatus("pending");
      dispatch(deletePost({ id: postToEdit.id }));

      dispatchFormAction({ type: "clear" });
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={author}
          onChange={onAuthorChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={body}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
        <button
          className="deleteButton"
          type="button"
          onClick={onDeletePostClicked}
        >
          Delete Post
        </button>
      </form>
    </section>
  );
};

export default EditPost;
