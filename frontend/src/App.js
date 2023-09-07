import Router from './Routers/index';
import { createContext, useState } from 'react';

export const LoggedinContext = createContext({
  loggedin: localStorage.getItem('access'),
  setLoggedin: () => {},
})

function App() {
  const [loggedin, setLoggedin] = useState(localStorage.getItem('access'));
  const value = { loggedin, setLoggedin };
  
  return (
    <div>
      <LoggedinContext.Provider value={value}>
        <Router />
      </LoggedinContext.Provider>
    </div>
  );
}

export default App;
