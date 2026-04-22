import { Box } from "@mui/material";
import Standings from "./Standings";
import News from "../components/News";

function HomePage() {
  return (
    <Box>
      <Standings simplified />
      <News />
    </Box>
  );
}

export default HomePage