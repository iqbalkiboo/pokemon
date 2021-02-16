import './App.css';
import ListCharacter from './Pages/ListCharacter';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Evolutions from './Pages/Evolutions';
import Pages500 from './Pages/Errors';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={ListCharacter} />
          <Route path="/evolution/:id" component={Evolutions} />
          <Route path="/error" component={Pages500} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
