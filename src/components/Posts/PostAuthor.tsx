import { Badge } from "@chakra-ui/react";

const PostAuthor: React.FC<{ author: string }> = ({ author }) => (
  <Badge colorScheme="green">by {author ?? "Unknown author"}</Badge>
);

export default PostAuthor;
