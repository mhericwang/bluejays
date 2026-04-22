const API_URL = "http://127.0.0.1:8080/api/mlb";

export const fetchStandings = async () => {
  const response = await fetch(`${API_URL}/standings`);
  if (!response.ok) throw new Error("Failed to fetch standings");
  return response.json();
};

export const fetchTeams = async () => {
  const response = await fetch(`${API_URL}/teams`);
  if (!response.ok) throw new Error("Failed to fetch teams");
  return response.json();
};

export const fetchStatLeaders = async (teamId?: number) => {
  const params = teamId ? `?team_id=${teamId}` : "";
  const response = await fetch(`${API_URL}/stat-leaders${params}`);
  if (!response.ok) throw new Error("Failed to fetch stat leaders");
  return response.json();
};
