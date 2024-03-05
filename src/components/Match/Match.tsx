import { useGlobalContext, eventType } from 'AppContext';
import { differenceInMinutes } from 'date-fns';
import { useState } from 'react';
import { getInitials } from 'helpers';

interface MatchProps {
  matchId: string;
  homeTeam: string;
  awayTeam: string;
}

export const Match: React.FC<MatchProps> = ({ matchId, homeTeam, awayTeam }) => {
  const [playerName, setPlayerName] = useState<string>('');

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
      playerName,
    });
  };

  const updateAwayScore = () => {
    dispatch({
      type: 'UPDATE_SCORE',
      matchId,
      newHomeScore: currentMatch?.homeScore || 0,
      newAwayScore: (currentMatch?.awayScore || 0) + 1,
      playerName,
    });
  };

  const playerGetsRedCard = () => {
    dispatch({
      type: 'RED_CARD',
      matchId,
      playerName,
    });
  };

  const playerGetsYellowCard = () => {
    dispatch({
      type: 'YELLOW_CARD',
      matchId,
      playerName,
    });
  };

  const deleteMatch = () => {
    dispatch({ type: 'DELETE_MATCH', matchId });
  };

  const getEventType = (event: eventType) => {
    switch (event) {
      case 'goal':
        return '"';
      case 'redCard':
        return '(Red Card)';
      case 'yellowCard':
        return '(Yellow Card)';
      default:
        break;
    }
  };

  return (
    <div data-testid={matchId}>
      <p>{`${homeTeam}(Home) vs ${awayTeam}(Away)`}</p>
      <p data-testid='score'>{`[${currentMatch?.homeScore || 0} - ${
        currentMatch?.awayScore || 0
      }]${currentMatch?.events
        .map(({ timestamp, event, playerName }) => {
          return `${differenceInMinutes(timestamp, currentMatch.startTimestamp)} ${getEventType(
            event,
          )} (${getInitials(playerName)})`;
        })
        .join(' ')}`}</p>
      <input
        placeholder='player name'
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button disabled={!playerName} onClick={updateHomeScore} data-testid='homeTeamButton'>
        Home Team Scores
      </button>
      <button disabled={!playerName} onClick={updateAwayScore} data-testid='awayTeamButton'>
        Away Team Scores
      </button>
      <button disabled={!playerName} onClick={playerGetsYellowCard} data-testid='homeTeamButton'>
        Yellow Card
      </button>
      <button disabled={!playerName} onClick={playerGetsRedCard} data-testid='awayTeamButton'>
        Red Card
      </button>
      <button disabled={!playerName} onClick={deleteMatch} data-testid='deleteMatchButton'>
        Delete Match
      </button>
    </div>
  );
};
