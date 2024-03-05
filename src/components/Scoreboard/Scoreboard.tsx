import { useGlobalContext } from 'AppContext';
import { Match } from 'components/Match/Match';
import { useState } from 'react';

export const Scoreboard = () => {
  const [newHomeTeam, setNewHomeTeam] = useState('');
  const [newAwayTeam, setNewAwayTeam] = useState('');
  const {
    dispatch,
    state: { matches },
  } = useGlobalContext();

  const handleAddMatch = () => {
    const newMatch = {
      id: `match${newHomeTeam}${newAwayTeam}`,
      homeTeam: newHomeTeam,
      awayTeam: newAwayTeam,
      homeScore: 0,
      awayScore: 0,
      startTimestamp: new Date(),
      events: [],
    };

    dispatch({ type: 'ADD_MATCH', match: newMatch });

    setNewHomeTeam('');
    setNewAwayTeam('');
  };

  return (
    <div>
      <h2>Scoreboard</h2>
      {matches.length ? (
        matches.map((match) => (
          <Match
            key={match.id}
            matchId={match.id}
            homeTeam={match.homeTeam}
            awayTeam={match.awayTeam}
          />
        ))
      ) : (
        <p data-testid='noMatchesAvailable'>No matches available</p>
      )}

      <div>
        <div>
          <label htmlFor='homeTeamInput'>Home Team:</label>
          <input
            type='text'
            id='homeTeamInput'
            value={newHomeTeam}
            onChange={(e) => setNewHomeTeam(e.target.value)}
            data-testid='homeTeamInput'
          />
        </div>
        <div>
          <label htmlFor='awayTeamInput'>Away Team:</label>
          <input
            type='text'
            id='awayTeamInput'
            value={newAwayTeam}
            onChange={(e) => setNewAwayTeam(e.target.value)}
            data-testid='awayTeamInput'
          />
        </div>
        <button
          onClick={handleAddMatch}
          disabled={!newHomeTeam || !newAwayTeam}
          data-testid='addMatchButton'
        >
          Add Match
        </button>
      </div>
    </div>
  );
};
