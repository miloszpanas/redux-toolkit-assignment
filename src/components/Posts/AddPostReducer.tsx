interface FormState {
  title: string;
  body: string;
  author: string;
}

type Action =
  | { type: "title"; payload: string }
  | { type: "body"; payload: string }
  | { type: "author"; payload: string }
  | { type: "clear" };

export const initialFormState: FormState = {
  title: "",
  body: "",
  author: "",
};

export const formDataReducer = (state: FormState, action: Action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.payload };
    case "body":
      return { ...state, body: action.payload };
    case "author":
      return { ...state, author: action.payload };
    case "clear":
      return { title: "", body: "", author: "" };
    default:
      return state;
  }
};
