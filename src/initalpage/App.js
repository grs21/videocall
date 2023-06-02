
import '.././App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { routes } from '../service/rooterService/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {
            routes.map(route => (
              <Route path={route.path}>
                <route.component />
              </Route>
            ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
