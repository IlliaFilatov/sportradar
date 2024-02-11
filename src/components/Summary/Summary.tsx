import { useGlobalContext, Match } from 'AppContext';
import { getMatchName } from 'helpers';
import { useState } from 'react';

export const Summary = () => {
  const { state } = useGlobalContext();
  const { matches } = state;

  const [summary, setSummary] = useState<Array<Match>>([]);

  const calculateSummary = () => {
    setSummary(
      [...matches].reverse().sort((a, b) => {
        const totalScoreA = a.homeScore + a.awayScore;
        const totalScoreB = b.homeScore + b.awayScore;

        return totalScoreB - totalScoreA;
      }),
    );
  };

  return (
    <div data-testid='summaryComponent'>
      <h2>Summary</h2>
      <button onClick={calculateSummary} data-testid='showSummaryButton'>
        Calculate Summary
      </button>
      {summary
        ? summary.map((match) => (
            <div key={match.id} data-testid={`matchSummary${match.id}`}>
              <p>{getMatchName(match.homeTeam, match.awayTeam)}</p>
              <p>{`${match.homeScore} - ${match.awayScore}`}</p>
            </div>
          ))
        : null}
    </div>
  );
};
