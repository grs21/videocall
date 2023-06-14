
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { routes } from '../service/rooterService/routes';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {
            routes.map(route => (
              <Route path={route.path} exact={route.exact} key={route.id}>
                <route.component />
              </Route>
            ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
