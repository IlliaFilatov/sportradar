import { useGlobalContext } from 'AppContext';

interface MatchProps {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
}

export const Match: React.FC<MatchProps> = ({ matchId, homeTeam, awayTeam }) => {
  const {
    dispatch,
    state: { matches },
  } = useGlobalContext();
  const currentMatch = matches.find((match) => match.id === matchId);

  const updateHomeScore = () => {
    dispatch({
      type: 'UPDATE_SCORE',
      matchId,
      newHomeScore: (currentMatch?.homeScore || 0) + 1,
      newAwayScore: currentMatch?.awayScore || 0,
    });
  };

  const updateAwayScore = () => {
    dispatch({
      type: 'UPDATE_SCORE',
      matchId,
      newHomeScore: currentMatch?.homeScore || 0,
      newAwayScore: (currentMatch?.awayScore || 0) + 1,
    });
  };

  const deleteMatch = () => {
    dispatch({ type: 'DELETE_MATCH', matchId });
  };

  return (
    <div data-testid={matchId}>
      <p>{`${homeTeam}(Home) vs ${awayTeam}(Away)`}</p>
      <p data-testid='score'>{`[${currentMatch?.homeScore || 0} - ${
        currentMatch?.awayScore || 0
      }]`}</p>
      <button onClick={updateHomeScore} data-testid='homeTeamButton'>
        Home Team Scores
      </button>
      <button onClick={updateAwayScore} data-testid='awayTeamButton'>
        Away Team Scores
      </button>
      <button onClick={deleteMatch} data-testid='deleteMatchButton'>
        Delete Match
      </button>
    </div>
  );
};
