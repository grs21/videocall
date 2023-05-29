import { useState } from 'react';
import './App.css';
import MyComponent from './component/MyComponent';


function App() {
  const [joined, setJoined] = useState(false);
  return (
    <div className="App">
      <h1>videoCall</h1>
      <MyComponent/>
    </div>
  );
}

export default App;
