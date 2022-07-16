import { parseISO, formatDistanceToNow } from "date-fns";
import { Badge } from "@chakra-ui/react";
import { BadgeStyled } from "../components/Posts/styles/PostStyled";

const TimePassed: React.FC<{ timestamp: string }> = ({ timestamp }) => {
  let timePassed = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timePassed = `${timePeriod} ago`;
  }

  return (
    <BadgeStyled>
      <Badge colorScheme="purple">{timePassed}</Badge>
    </BadgeStyled>
  );
};
export default TimePassed;
