
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { routes } from '../service/rooterService/routes';
import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPrepareVideo } from '../service/api/room';
import { createSlice, setCallProperty } from '../stores/slices/videoRoomSlice';
function App() {
  const dispatch = useDispatch();
  const effectRun = useRef(false);
  useEffect(() => {
    if (effectRun.current === false) {
      const initializeApp = async () => {
        const resPrepareVideoCall = await getPrepareVideo();
        dispatch(setCallProperty(resPrepareVideoCall));
      }
      initializeApp();
      return () =>{
        effectRun.current = true;
      }
    }
  })
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
