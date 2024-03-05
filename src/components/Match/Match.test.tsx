import { render, screen, fireEvent } from '@testing-library/react';
import { GlobalContextProvider } from 'AppContext';
import { getMatchName } from 'helpers';

import { Scoreboard } from 'components/Scoreboard/Scoreboard';

const team1 = 'TeamA';
const team2 = 'TeamB';
const matchId = `match${team1}${team2}`;

// const setup = () => {
//   render(
//     <GlobalContextProvider
//       customInitialState={{
//         matches: [
//           {
//             id: matchId,
//             homeTeam: team1,
//             awayTeam: team2,
//             homeScore: 0,
//             awayScore: 0,
//           },
//         ],
//       }}
//     >
//       <Scoreboard />
//     </GlobalContextProvider>,
//   );
// };

describe('Match Component', () => {
  // beforeEach(() => {
  //   setup();
  // });
  // it('renders correctly and updates scores', () => {
  //   const homeTeamScoresButton = screen.getByTestId('homeTeamButton');
  //   const awayTeamScoresButton = screen.getByTestId('awayTeamButton');
  //   const score = screen.getByTestId('score');
  //   expect(screen.getByText(getMatchName(team1, team2))).toBeInTheDocument();
  //   expect(score.textContent).toBe('[0 - 0]');
  //   fireEvent.click(homeTeamScoresButton);
  //   expect(score.textContent).toBe('[1 - 0]');
  //   fireEvent.click(awayTeamScoresButton);
  //   expect(score.textContent).toBe('[1 - 1]');
  // });
  // it('deletes a match correctly', () => {
  //   const deleteMatchButton = screen.getByTestId('deleteMatchButton');
  //   fireEvent.click(deleteMatchButton);
  //   expect(screen.queryByTestId(matchId)).toBeNull();
  // });
});
