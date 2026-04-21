import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Container,
  Button,
  Popover,
  Paper,
  Grid,
  Backdrop,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HomeBaseLogo from "../assets/homebase-logo.png";

const pages = ["Standings", "Teams", "Leaders"];

// mock data (replace with real MLB data later)
const teams = [
  { id: 1, name: "Blue Jays", league: "AL", record: "10-8" },
  { id: 2, name: "Yankees", league: "AL", record: "12-6" },
  { id: 3, name: "Dodgers", league: "NL", record: "11-7" },
];

function TopNavBar() {
  const [anchorElTeams, setAnchorElTeams] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenTeams = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTeams(event.currentTarget);
  };

  const handleCloseTeams = () => {
    setAnchorElTeams(null);
  };

  const handleClickedTeams = (team: number) => {
    console.log(team);
    setAnchorElTeams(null);
  };

  return (
    <AppBar position="static">
      <Container>
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
              if (page === "Teams") {
                return (
                  <Button
                    key={page}
                    onClick={handleOpenTeams}
                    sx={{ ml: 2, color: "white" }}
                  >
                    {page}
                    <ArrowDropDownIcon />
                  </Button>
                );
              }

              return (
                <Button key={page} sx={{ ml: 2, color: "white" }}>
                  {page}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>

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
              minWidth: 500,
            },
          },
        }}
      >
        <Paper elevation={0}>
          <Grid container>
            {teams.map((team) => (
              <Grid
                key={team.id}
                size={2}
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
                  handleClickedTeams(team.id);
                }}
              >
                {team.name}
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Popover>
    </AppBar>
  );
}

export default TopNavBar;
