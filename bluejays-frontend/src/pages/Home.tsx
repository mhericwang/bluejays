import { Box } from "@mui/material";
import Standings from "./Standings";
import News from "../components/News";
import StatLeaders from "../components/StatLeaders";

function HomePage() {
  return (
    <Box>
      <Standings simplified />
      <News />
      <StatLeaders />
    </Box>
  );
}

export default HomePage