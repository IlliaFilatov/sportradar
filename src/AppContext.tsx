import { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

type Action =
  | { type: 'UPDATE_SCORE'; matchId: string; newHomeScore: number; newAwayScore: number }
  | { type: 'ADD_MATCH'; match: Match }
  | { type: 'DELETE_MATCH'; matchId: string };

interface GlobalState {
  matches: Match[];
}

const initialState: GlobalState = {
  matches: [],
};

const GlobalContext = createContext<{
  state: GlobalState;
  dispatch: Dispatch<Action>;
} | null>(null);

const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'UPDATE_SCORE':
      return {
        ...state,
        matches: state.matches.map((match) =>
          match.id === action.matchId
            ? { ...match, homeScore: action.newHomeScore, awayScore: action.newAwayScore }
            : match,
        ),
      };
    case 'ADD_MATCH':
      return { ...state, matches: [...state.matches, action.match] };
    case 'DELETE_MATCH':
      return { ...state, matches: state.matches.filter((match) => match.id !== action.matchId) };
    default:
      return state;
  }
};

const GlobalContextProvider: React.FC<{
  children: ReactNode;
  customInitialState?: GlobalState;
}> = ({ children, customInitialState }) => {
  const [state, dispatch] = useReducer(globalReducer, customInitialState || initialState);

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};

export { GlobalContextProvider, useGlobalContext };
