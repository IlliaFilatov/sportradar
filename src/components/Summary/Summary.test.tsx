import { render, screen, fireEvent } from '@testing-library/react';
import { GlobalContextProvider, useGlobalContext } from 'AppContext';
import { getMatchName } from 'helpers';

import { Scoreboard } from 'components/Scoreboard/Scoreboard';
import { Summary } from './Summary';

const setup = () => {
  render(
    <GlobalContextProvider>
      <Scoreboard />
      <Summary />
    </GlobalContextProvider>,
  );
};

const team1 = 'TeamA';
const team2 = 'TeamB';
const team3 = 'TeamC';
const team4 = 'TeamD';
const team5 = 'TeamE';
const team6 = 'TeamF';

describe('Summary Component', () => {
  beforeEach(() => {
    setup();
    const addMatchButton = screen.getByTestId('addMatchButton');

    fireEvent.change(screen.getByTestId('homeTeamInput'), { target: { value: team1 } });
    fireEvent.change(screen.getByTestId('awayTeamInput'), { target: { value: team2 } });
    fireEvent.click(addMatchButton);

    fireEvent.change(screen.getByTestId('homeTeamInput'), { target: { value: team3 } });
    fireEvent.change(screen.getByTestId('awayTeamInput'), { target: { value: team4 } });
    fireEvent.click(addMatchButton);

    fireEvent.change(screen.getByTestId('homeTeamInput'), { target: { value: team5 } });
    fireEvent.change(screen.getByTestId('awayTeamInput'), { target: { value: team6 } });
    fireEvent.click(addMatchButton);

    fireEvent.click(screen.getByTestId('showSummaryButton'));
  });

  it('renders correctly', () => {
    const summaryComponent = screen.getByTestId('summaryComponent');
    expect(summaryComponent).toBeInTheDocument();
  });

  it('displays the correct number of games', () => {
    const matches = screen.getAllByTestId(/^match/);
    expect(matches.length).toBe(3);
  });

  it('orders correctly when total scores are the same', () => {
    const matches = screen.getAllByTestId(/^match/);
    expect(matches[0]).toHaveTextContent(getMatchName(team5, team6));
    expect(matches[1]).toHaveTextContent(getMatchName(team3, team4));
    expect(matches[2]).toHaveTextContent(getMatchName(team1, team2));
  });

  it('orders by total score when scores are different', () => {
    const { dispatch } = useGlobalContext();
    dispatch({
      type: 'UPDATE_SCORE',
      matchId: `match${team1}${team2}`,
      newHomeScore: 2,
      newAwayScore: 2,
    });
    dispatch({
      type: 'UPDATE_SCORE',
      matchId: `match${team3}${team4}`,
      newHomeScore: 1,
      newAwayScore: 1,
    });

    const matches = screen.getAllByTestId(/^match/);
    expect(matches[0]).toHaveTextContent(getMatchName(team1, team2));
    expect(matches[1]).toHaveTextContent(getMatchName(team3, team4));
    expect(matches[2]).toHaveTextContent(getMatchName(team5, team6));
  });
});
