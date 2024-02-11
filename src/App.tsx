import './App.css';
import { GlobalContextProvider } from 'AppContext';
import { Summary } from 'components/Summary/Summary';
import { Scoreboard } from 'components/Scoreboard/Scoreboard';

function App() {
  return (
    <GlobalContextProvider>
      <div className='App'>
        <Scoreboard />
        <Summary />
      </div>
    </GlobalContextProvider>
  );
}

export default App;
