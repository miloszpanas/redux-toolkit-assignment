import { useReducer } from "react";
import { Empty } from "antd";
import {
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Button,
  FormHelperText,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { formDataReducer, initialFormState } from "./AddPostReducer";
import { EmptyContainer } from "./styles/PostStyled";
import { updatePost, addNewPost } from "../../reducers/Posts/postServices";
import { selectPostsByIdSelector } from "../../reducers/Posts/selectors";
import { useParams, useNavigate } from "react-router-dom";

const MutatePost: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const postToEdit = useAppSelector((state) =>
    selectPostsByIdSelector(state, Number(id))
  );

  const isForEdit = id !== undefined;
  const reducerInitialContent = isForEdit ? postToEdit! : initialFormState;

  const [{ title, body, author }, dispatchFormAction] = useReducer(
    formDataReducer,
    reducerInitialContent
  );

  if (isForEdit && !postToEdit) {
    return (
      <EmptyContainer>
        <Empty />
      </EmptyContainer>
    );
  }

  const changeTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchFormAction({ type: "title", payload: e.target.value });
  const changeContentHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    dispatchFormAction({ type: "body", payload: e.target.value });
  const changeAuthorHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatchFormAction({ type: "author", payload: e.target.value });

  const editPost = (): void => {
    try {
      dispatch(
        updatePost({
          id: postToEdit!.id,
          title,
          body,
          userId: postToEdit!.userId,
          author,
          thumbsUp: postToEdit!.thumbsUp,
        })
      );

      dispatchFormAction({ type: "clear" });
      navigate(`/post/${id}`);
    } catch (err) {
      console.error("post could not be updated, check error message", err);
    }
  };

  const savePost = (): void => {
    try {
      dispatch(addNewPost({ title, body, userId: "1", author }));
      dispatchFormAction({ type: "clear" });
      navigate("/");
    } catch (err) {
      console.error("Post could not be saved, check error message", err);
    }
  };

  const formAction = isForEdit ? editPost : savePost;

  return (
    <form action="submit">
      <Stack spacing={8} width={600} marginTop={100}>
        <FormControl isRequired>
          <FormLabel htmlFor="">Post Title:</FormLabel>
          <Input
            isRequired
            type="text"
            value={title}
            id="title"
            onChange={changeTitleHandler}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="">Post Author:</FormLabel>
          <Input
            isRequired
            type="text"
            value={author}
            id="author"
            onChange={changeAuthorHandler}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="">Post Content:</FormLabel>
          <Textarea
            isRequired
            value={body}
            id="body"
            onChange={changeContentHandler}
            rows={5}
          />
          <FormHelperText>
            {[title, body, author].some((el) => !el) &&
              "Please fill out all the fields"}
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Button
            type="submit"
            colorScheme="blue"
            isDisabled={[title, body, author].some((el) => !el)}
            onClick={formAction}
          >
            {isForEdit ? "Update Post" : "Add Post"}
          </Button>
        </FormControl>
      </Stack>
    </form>
  );
};

export default MutatePost;
