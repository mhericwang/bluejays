import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPlayerDetails } from "../api/api";
import type { Hitter, Pitcher } from "../types/mlb";
import PlayerTable from "../components/PlayerTable";
import GameLogsTable from "../components/GameLogsTable";

const SEASON_COLUMNS_PITCHER = [
  { field: "year", header: "Year" },
  { field: "team", header: "Team" },
  { field: "gamesPitched", header: "G" },
  { field: "inningsPitched", header: "IP" },
  { field: "battersFaced", header: "BF" },
  { field: "era", header: "ERA" },
  { field: "wins", header: "W" },
  { field: "losses", header: "L" },
  { field: "strikeOuts", header: "SO" },
  { field: "baseOnBalls", header: "BB" },
  { field: "strikeOutsPercentage", header: "SO%" },
  { field: "baseOnBallsPercentage", header: "BB%" },
  { field: "strikeoutsPer9Inn", header: "SO/9" },
  { field: "avg", header: "AVG" },
  { field: "whip", header: "WHIP" },
  { field: "hits", header: "H" },
  { field: "hitByPitch", header: "HBP" },
  { field: "homeRuns", header: "HR" },
];

const SEASON_COLUMNS_HITTER = [
  { field: "year", header: "Year" },
  { field: "team", header: "Team" },
  { field: "gamesPlayed", header: "G" },
  { field: "plateAppearances", header: "PA" },
  { field: "hits", header: "H" },
  { field: "runs", header: "R" },
  { field: "rbi", header: "RBI" },
  { field: "doubles", header: "2B" },
  { field: "triples", header: "3B" },
  { field: "homeRuns", header: "HR" },
  { field: "avg", header: "AVG" },
  { field: "obp", header: "OBP" },
  { field: "slg", header: "SLG" },
  { field: "ops", header: "OPS" },
  { field: "babip", header: "BABIP" },
  { field: "strikeOuts", header: "SO" },
  { field: "baseOnBalls", header: "BB" },
  { field: "strikeOutsPercentage", header: "SO%" },
  { field: "baseOnBallsPercentage", header: "BB%" },
  { field: "stolenBases", header: "SB" },
  { field: "caughtStealing", header: "CS" },
];

const GAMELOG_COLUMNS_PITCHER = [
  { field: "date", header: "Date" },
  { field: "opponent", header: "Opponent" },
  { field: "summary", header: "Summary" },
  { field: "hits", header: "H" },
  { field: "numberOfPitches", header: "PC" },
  { field: "battersFaced", header: "BF" },
  { field: "avg", header: "AVG" },
  { field: "doubles", header: "2B" },
  { field: "triples", header: "3B" },
  { field: "homeRuns", header: "HR" },
  { field: "intentionalWalks", header: "IBB" },
  { field: "hitByPitch", header: "HBP" },
  { field: "wildPitches", header: "WP" },
];

const GAMELOG_COLUMNS_HITTER = [
  { field: "date", header: "Date" },
  { field: "opponent", header: "Opponent" },
  { field: "summary", header: "Summary" },
  { field: "plateAppearances", header: "PA" },
  { field: "hits", header: "H" },
  { field: "rbi", header: "RBI" },
  { field: "runs", header: "R " },
  { field: "doubles", header: "2B" },
  { field: "triples", header: "3B" },
  { field: "homeRuns", header: "HR" },
  { field: "intentionalWalks", header: "IBB" },
  { field: "hitByPitch", header: "HBP" },
  { field: "stolenBases", header: "SB" },
  { field: "caughtStealing", header: "CS" },
];

function Players() {
  const { playerId } = useParams<{ playerId: string }>();
  const [playerDetails, setPlayerDetails] = useState<
    Pitcher | Hitter | undefined
  >(undefined);

  useEffect(() => {
    fetchPlayerDetails(parseInt(playerId))
      .then((data) => setPlayerDetails(data))
      .catch((error) => console.error("Failed to fetch player details", error));
  }, [playerId]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 2,
        }}
      >
        <img
          src={playerDetails?.headshot}
          alt={playerDetails?.lastName}
          style={{ width: 48, height: 48, marginRight: 16 }}
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" sx={{ fontWeight: 700, fontSize: 24 }}>
            {playerDetails?.firstName} {playerDetails?.lastName}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
            {playerDetails?.position} | {playerDetails?.teamName}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 2 }}>
        <PlayerTable data={playerDetails?.yearlyStats || []} columns={playerDetails?.position !== "P" ? SEASON_COLUMNS_HITTER : SEASON_COLUMNS_PITCHER} />
      </Box>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Recent Games
      </Typography>
      <GameLogsTable data={playerDetails?.gamelogs || []} columns={playerDetails?.position !== "P" ? GAMELOG_COLUMNS_HITTER : GAMELOG_COLUMNS_PITCHER} />
    </Box>
  );
}

export default Players;
