import { createContext, useState, useEffect, type ReactNode } from 'react';
import { fetchStandings } from '../api/api';
import type { StandingsByDivision } from '../types/mlb';

// eslint-disable-next-line react-refresh/only-export-components
export const TeamsContext = createContext<StandingsByDivision | null | undefined>({});

export const TeamsProvider = ({ children }: { children: ReactNode }) => {
  const [teams, setTeams] = useState<StandingsByDivision | null>(null);

  useEffect(() => {
    fetchStandings().then(setTeams).catch(console.error);
  }, []);

  return <TeamsContext.Provider value={teams}>{children}</TeamsContext.Provider>;
};
