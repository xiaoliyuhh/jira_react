import './App.css';
import { useAuth } from 'context/auth-context';
import { LogginApp } from 'loggin-app';
import { NonloginApp } from 'nonlogin-app';

function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      {user ? <LogginApp /> : <NonloginApp />}
    </div>
  );
}

export default App;
