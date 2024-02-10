import { render, screen, fireEvent } from '@testing-library/react';
import { GlobalContextProvider } from 'AppContext';

import { Scoreboard } from './Scoreboard';

const team1 = 'TeamA';
const team2 = 'TeamB';

const setup = () => {
  render(
    <GlobalContextProvider>
      <Scoreboard />
    </GlobalContextProvider>,
  );
};

describe('Scoreboard Component', () => {
  beforeEach(() => {
    setup();
  });
  it('renders correctly with no matches', () => {
    const noMatchesMessage = screen.getByTestId('noMatchesAvailable');
    expect(noMatchesMessage).toBeInTheDocument();
  });

  it('adds a new match correctly', () => {
    const addMatchButton = screen.getByTestId('addMatchButton');
    fireEvent.change(screen.getByTestId('homeTeamInput'), { target: { value: team1 } });
    fireEvent.change(screen.getByTestId('awayTeamInput'), { target: { value: team2 } });
    fireEvent.click(addMatchButton);

    const matches = screen.getAllByTestId(/^match/);
    expect(matches.length).toBe(1);
  });
});
