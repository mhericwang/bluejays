import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Button,
  Popover,
  Paper,
  Grid,
  Backdrop,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HomeBaseLogo from "../assets/homebase-logo.png";
import { useTeams } from "../hooks/useTeams";

const pages = ["Standings", "Teams", "Leaders"];

function TopNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorElTeams, setAnchorElTeams] = useState<null | HTMLElement>(
    null,
  );
  const teamsData = useTeams();
  const allTeams = teamsData ? Object.values(teamsData).flat() : [];

  const handleOpenTeams = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTeams(event.currentTarget);
  };

  const handleCloseTeams = () => {
    setAnchorElTeams(null);
  };

  const handleClickedTeams = (teamId: number) => {
    setAnchorElTeams(null);
    navigate(`/teams/${teamId}`);
  };

  return (
    <AppBar position="static" sx={{ mb: 2 }}>
      <Box sx={{ mx: 2 }}>
        <Toolbar disableGutters>
          <IconButton component="a" href="/" sx={{ p: 0, mr: 2 }}>
            <Box
              component="img"
              src={HomeBaseLogo}
              alt="HomeBase Logo"
              sx={{ height: 32 }}
            />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "right" }}>
            {pages.map((page) => {
              const isActive =
                (page === "Standings" && location.pathname === "/standings") ||
                (page === "Teams" && location.pathname.startsWith("/teams")) ||
                (page === "Leaders" && location.pathname === "/leaders");

              if (page === "Teams") {
                return (
                  <Button
                    key={page}
                    onClick={handleOpenTeams}
                    sx={{
                      ml: 2,
                      color: "white",
                      borderBottom: isActive ? "3px solid white" : "3px solid transparent",
                      borderRadius: 0,
                      pb: isActive ? 0.5 : 0.5,
                    }}
                  >
                    {page}
                    <ArrowDropDownIcon />
                  </Button>
                );
              }

              const route = page === "Standings" ? "/standings" : "/leaders";
              return (
                <Button
                  key={page}
                  component={Link}
                  to={route}
                  sx={{
                    ml: 2,
                    color: "white",
                    borderBottom: isActive ? "3px solid white" : "3px solid transparent",
                    borderRadius: 0,
                    pb: isActive ? 0.5 : 0.5,
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Box>

      <Backdrop
        open={Boolean(anchorElTeams)}
        sx={{ zIndex: 1200 }}
        onClick={handleCloseTeams}
      />

      <Popover
        open={Boolean(anchorElTeams)}
        anchorEl={anchorElTeams}
        onClose={handleCloseTeams}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              p: 2,
              width: "fit-content",
              maxWidth: 600,
            },
          },
        }}
      >
        <Paper elevation={0}>
          <Grid container columns={5}>
            {allTeams.map((team) => (
              <Grid
                key={team.team}
                size={1}
                sx={{
                  py: 1,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.08)",
                  },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={() => {
                  handleClickedTeams(team.team);
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={team.logo}
                    alt={team.abbreviation}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  {team.abbreviation}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Popover>
    </AppBar>
  );
}

export default TopNavBar;
